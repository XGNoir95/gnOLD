import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Game",
      link: "/all-games",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible);
    console.log("Mobile nav visibility:", !mobileNavVisible);
  };

  return (
    <>
      <nav className="z-50 relative flex bg-[#1e0b37] text-white px-8 py-4 items-center justify-between">
        <Link to={"/"} className="flex items-center">
          <img className="h-8 me-4" src="logo.png" alt="logo" />
        </Link>

        <div className="block md:flex items-center space-x-4">
          {/* Links aligned to the right */}
          <div className="hidden md:ml-auto md:flex gap-4">
            {links.map((item, i) => (
              <Link
                to={item.link}
                className="hover:text-purple-500 transition-all duration-300"
                key={i}
              >
                {item.title}
              </Link>
            ))}
          </div>
          {/* Buttons aligned to the right */}
          <div className="hidden md:ml-auto md:flex items-center gap-4">
            <Link
              to="/LogIn"
              className="px-2 py-1 border border-purple-500 rounded hover:bg-white hover:text-purple-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to={"/SignUp"}
              className="px-2 py-1 bg-purple-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </div>
          <button
            className="block md:hidden text-white text-4xl hover:text-zinc-400"
            onClick={toggleMobileNav}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${
          mobileNavVisible ? "block" : "hidden"
        } h-screen absolute top-20 left-0 w-full flex flex-col items-center justify-center z-50`}
        style={{ backgroundColor: "#1e0b37" }} // Added inline style here
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
            key={i}
          >
            {item.title}{""}
          </Link>
        ))}

        <Link
          to={"/LogIn"}
          className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
        >
          LogIn
        </Link>
        <Link
          to={"/SignUp"}
          className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
        >
          SignUp
        </Link>
      </div>
    </>
  );
};

export default Navbar;
