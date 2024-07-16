import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../Store/auth';
import axios from 'axios';

const LogIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submit = async () => {
    try {
      if (values.email === "" || values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("https://game-nova-api.vercel.app/api/v1/sign-in", values, {
          withCredentials: true
        });
        console.log("Login response:", response.data);

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken); // Store refresh token
        localStorage.setItem("role", response.data.role);

        console.log("Access Token:", localStorage.getItem("token"));
        console.log("Refresh Token:", localStorage.getItem("refreshToken"));

        navigate("/profile");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      backgroundImage: `url('bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="bg-[#1e0b37] rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-amber-500 text-2xl font-bold text-center mb-4">Log In To Your Account:</p>
        <div className="mt-4">
          <div>
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2 bg-gray-200 text-black p-2 outline-none"
              placeholder="Email"
              name="email"
              required
              value={values.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-gray-200 text-black p-2 outline-none"
              placeholder="Password"
              name="password"
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-purple-800 text-white font-semibold py-2 rounded hover:bg-amber-600 transition-all duration-300"
              onClick={submit}
            >
              Log In
            </button>
          </div>
          <p className="flex mt-4 items-center text-zinc-500 font-semibold">
            Don't have an account?
            <a href="/SignUp" className="text-amber-500 ml-2">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
