import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
    return (
        <>
            {role === "user" && <div className="w-full lg:hidden flex items-center justify-between mt-4"><Link
                to="/profile"
                className='text-xl text-zinc-100 font-semibold w-full text-center hover:bg-purple-900 rounded transition-all duration-300 mb-4'>
                Favourites
            </Link>
                <Link
                    to="/profile/orderHistory"
                    className='text-xl text-zinc-100 font-semibold w-full text-center hover:bg-purple-900 rounded transition-all duration-300 mb-4'>
                    Order History
                </Link>
                <Link
                    to="/profile/settings"
                    className='text-xl text-zinc-100 font-semibold w-full text-center hover:bg-purple-900 rounded transition-all duration-300 mb-4'>
                    Settings
                </Link></div>}

            {role === "admin" && <div className="w-full lg:hidden flex items-center justify-between mt-4"><Link
                to="/profile"
                className='text-xl text-zinc-100 font-semibold w-full text-center hover:bg-purple-900 rounded transition-all duration-300 mb-4'>
                All Orders
            </Link>
                <Link
                    to="/profile/add-game"
                    className='text-xl text-zinc-100 font-semibold w-full text-center hover:bg-purple-900 rounded transition-all duration-300 mb-4'>
                    Add Game
                </Link>
                {/* <Link
                    to="/profile/settings"
                    className='text-xl text-zinc-100 font-semibold w-full text-center hover:bg-purple-900 rounded transition-all duration-300 mb-4'>
                    Settings
                </Link> */}
                </div>}
        </>


    )
}

export default MobileNav