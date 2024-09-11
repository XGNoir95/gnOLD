import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/auth';

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-[#1e0b37] p-4 rounded flex flex-col items-center justify-between w-full lg:w-auto">
      <div className='flex items-center flex-col justify-center mb-8'>
        {data && data.avatar ? (
          <img src={data.avatar} className="h-20 w-20 rounded-full mb-4" alt="User Avatar" />
        ) : (
          <div className="h-25 w-25 rounded-full bg-gray-400 flex items-center justify-center text-gray-700 mb-4">
            No Avatar
          </div>
        )}
        {data && (
          <>
            <p className="text-3xl text-amber-500 font-semibold mb-">
              {data.username}
            </p>
            <p className="text-xl text-zinc-300 mb-4">
              {data.email}
            </p>
          </>
        )}
        <div className='w-full h-1 bg-amber-500'></div>
      </div>

      {role === "user" && (
        <div className='w-full flex flex-col items-center justify-center lg:flex-row lg:justify-start'>
          <Link
            to="/profile"
            className='bg-pink-900 text-white hover:bg-amber-500 hover:text-zinc-900 text-sm lg:text-base text-zinc-100 font-semibold w-full py-2 text-center rounded transition-all duration-300 mb-2 lg:mb-0 lg:mr-2'>
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className='bg-pink-900 text-white hover:bg-amber-500 hover:text-zinc-900  text-sm lg:text-base text-zinc-100 font-semibold w-full py-2 text-center rounded transition-all duration-300 mb-2 lg:mb-0 lg:mr-2'>
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className='bg-pink-900 text-white hover:bg-amber-500 hover:text-zinc-900 text-sm lg:text-base text-zinc-100 font-semibold w-full py-2 text-center rounded transition-all duration-300'>
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className='w-full flex flex-col items-center justify-center lg:flex-row lg:justify-start'>
          <Link
            to="/profile"
            className='bg-pink-900 text-white hover:bg-amber-500 hover:text-zinc-900  text-sm lg:text-base text-zinc-100 font-semibold w-full py-2 text-center rounded transition-all duration-300 mb-2 lg:mb-0 lg:mr-2'>
            All Orders
          </Link>
          <Link
            to="/profile/add-game"
            className='bg-pink-900 text-white hover:bg-amber-500 hover:text-zinc-900  text-sm lg:text-base text-zinc-100 font-semibold w-full py-2 text-center rounded transition-all duration-300 mb-2 lg:mb-0 lg:mr-2'>
            Add Game
          </Link>
        </div>
      )}

      <button
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/LogIn");
        }}
        className='bg-pink-900 text-white w-full font-semibold flex items-center justify-center py-2 rounded hover:bg-amber-500 hover:text-zinc-900 transition-all duration-300 mt-4'>
        Log Out <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default Sidebar;
