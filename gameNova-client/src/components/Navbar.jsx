import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import logo from "../assets/logo.png"; // Import your custom logo image

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    // navItems here
    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Shop", path: "/shop" },
        { link: "Sell Your Game", path: "/admin/dashboard" },
        { link: "Blog", path: "/blog" },
    ];

    return (
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
            <nav className={`flex items-center justify-between p-4 ${isSticky ? 'sticky top-0 bg-white shadow-md' : ''}`}>
                <div>
                    {/* logo */}
                    <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'>
                        <img src={logo} alt="GameNova Logo" style={{ width: '180px', height: '20px' }} />
                    </Link>
                </div>
                {/* nav items for large devices */}
                <ul className='md:flex space-x-12 hidden'>
                    {
                        navItems.map(({ link, path }) => (
                            <li key={path}>
                                <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                                    {link}
                                </Link>
                            </li>
                        ))
                    }
                </ul>

                {/* btn for lg devices */}
                <div className='space-x-12 hidden lg:flex items-center'>
                    <button><FaBarsStaggered className='w-5 hover:text-blue-700' /></button>
                </div>

                {/* menu btn for mobile devices */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black focus:outline-none'>
                        {isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />}
                    </button>
                </div>
            </nav>

            {/* nav items for sm devices */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} fixed top-0 right-0 left-0 bg-blue-700 space-y-4 px-4 mt-12 py-7 z-50`}>
                {
                    navItems.map(({ link, path }) => (
                        <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>
                            {link}
                        </Link>
                    ))
                }
            </div>
        </header>
    )
}

export default Navbar;
