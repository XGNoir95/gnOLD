import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Store/auth";
// Update the path as necessary

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Dispatch logout action
    dispatch(authActions.logout());

    // Redirect to home page
    navigate('/');

    // Close mobile navigation if open
    setMobileNavVisible(false);
  };

  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible);
    console.log("Mobile nav visibility:", !mobileNavVisible);
  };

  // Define links based on login status
  let links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Games",
      link: "/all-games",
    },
  ];

  if (isLoggedIn) {
    links.push(
      {
        title: "Cart",
        link: "/cart",
      },
      {
        title: "Profile",
        link: "/profile",
      },
      {
        title: "Log Out",
        link: "/logout",
        action: handleLogout,
      }
    );
  }

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
              <div className="flex items-center" key={i}>
                {item.title === "Profile" ? (
                  <Link
                    to={item.link}
                    className="px-2 py-1 border border-pink-500 rounded hover:bg-pink-500 hover:text-white transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ) : item.title === "Log Out" ? (
                  <button
                    onClick={item.action}
                    className="px-2 py-1 bg-pink-500 rounded hover:bg-purple-800 hover:text-white transition-all duration-300"
                  >
                    {item.title}
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className="hover:text-amber-500 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {/* Buttons aligned to the right */}
          {!isLoggedIn && (
            <div className="hidden md:ml-auto md:flex items-center gap-4">
              <Link
                to="/LogIn"
                className="px-2 py-1 border border-pink-500 rounded hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to={"/SignUp"}
                className="px-2 py-1 bg-pink-500 rounded hover:bg-purple-800 hover:text-white transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}
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
          item.title === "Log Out" ? (
            <button
              onClick={item.action}
              className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {item.title}
            </button>
          ) : (
            <Link
              to={item.link}
              className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {item.title}
            </Link>
          )
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to={"/LogIn"}
              className="px-8 mb-8 text-3xl font-semibold py-2 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to={"/SignUp"}
              className="px-8 mb-8 text-3xl font-semibold py-2 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
