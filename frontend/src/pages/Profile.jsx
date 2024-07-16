import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/loader';

const Profile = () => {
  const [Profile, setProfile] = useState();
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${token}`,
  };

  //console.log('Component mounted');
  console.log('JWT Token:', token);
  console.log('Refresh Token:', refreshToken);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          'https://game-nova-api.vercel.app/api/v1/get-user-information',
          { headers, withCredentials: true }
        );
        console.log('Fetched Profile data:', response.data);
        setProfile(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.log('Access token expired, trying to refresh...');
          // Try to refresh the access token
          if (refreshToken) {
            try {
              const refreshResponse = await axios.post(
                'https://game-nova-api.vercel.app/api/v1/token',
                { token: refreshToken },
                { withCredentials: true }
              );
              const newAccessToken = refreshResponse.data.accessToken;
              localStorage.setItem('token', newAccessToken);

              console.log('New JWT Token:', newAccessToken);

              // Retry fetching the profile data with the new token
              const retryResponse = await axios.get(
                'https://game-nova-api.vercel.app/api/v1/get-user-information',
                {
                  headers: {
                    id: localStorage.getItem('id'),
                    authorization: `Bearer ${newAccessToken}`,
                  },
                  withCredentials: true
                }
              );
              setProfile(retryResponse.data);
            } catch (refreshError) {
              console.error('Error refreshing token:', refreshError);
            }
          } else {
            console.log('No refresh token available');
          }
        } else {
          console.error('Error fetching profile data:', error);
        }
      }
    };
    fetch();
  }, [token, refreshToken]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center text-white px-10 py-8" 
      style={{ backgroundImage: `url('bg2.jpg')` }}
    > 
      {!Profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {Profile && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Sidebar data={Profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
