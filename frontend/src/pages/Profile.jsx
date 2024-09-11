import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/loader';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  const [Profile, setProfile] = useState();
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          'https://gn-old.vercel.app/api/v1/get-user-information',
          { headers }
        );

        console.log('Fetched Profile data:', response.data);
        setProfile(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.log('Access token expired, trying to refresh...');
          if (refreshToken) {
            try {
              const refreshResponse = await axios.post(
                'https://gn-old.vercel.app/api/v1/token',
                { token: refreshToken }
              );

              const newAccessToken = refreshResponse.data.accessToken;
              localStorage.setItem('token', newAccessToken);

              console.log('New JWT Token:', newAccessToken);

              const retryResponse = await axios.get(
                'https://gn-old.vercel.app/api/v1/get-user-information',
                {
                  headers: {
                    id: localStorage.getItem('id'),
                    authorization: `Bearer ${newAccessToken}`,
                  },
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
    <div className="bg-[url('/bg5.jpg')] px-2 md:px-12 py-8 flex flex-col text-white min-h-screen">
      {!Profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {Profile && (
        <>
          <div className="w-full">
            <Sidebar data={Profile} />
          </div>
          <div className="w-full mt-4">
            <Outlet />
          </div>
          <MobileNav />
        </>
      )}
    </div>
  );
};

export default Profile;
