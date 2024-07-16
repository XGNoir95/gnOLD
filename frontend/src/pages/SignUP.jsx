import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submit = async () => {
    try {
      if (values.username === "" || values.email === "" || values.password === "" || values.address === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("https://game-nova-api.vercel.app/api/v1/sign-up", values, { withCredentials: true });
        console.log("Signup Successful:", response.data);
        navigate("/LogIn");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      if (error.response) {
        console.log("Response Data:", error.response.data);
        console.log("Response Status:", error.response.status);
        alert("Error: " + error.response.data.message);
      } else {
        console.error("General Error:", error.message);
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
        <p className="text-amber-500 text-2xl font-bold text-center mb-4">Sign Up:</p>
        
        <div className="mt-4">
          <div>
            <label htmlFor="username" className="text-white">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-200 text-black p-2 outline-none"
              placeholder="Username"
              name="username"
              required
              value={values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
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
            <label htmlFor="address" className="text-white">
              Address
            </label>
            <textarea
              className="w-full mt-2 bg-gray-200 text-black p-2 outline-none"
              rows="5"
              placeholder="Address"
              name="address"
              required
              value={values.address}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-purple-800 text-white font-semibold py-2 rounded hover:bg-amber-600 transition-all duration-300"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
          <p className="flex mt-4 items-center text-zinc-500 font-semibold">
            Already have an account?
            <a href="/LogIn" className="text-amber-500 ml-2">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
