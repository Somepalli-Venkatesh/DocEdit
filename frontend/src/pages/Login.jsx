import React, { useState } from 'react';
import logo from "../images/logo.png";
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdOutlineWifiPassword } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import rightIMG from "../images/loginRight.png";
import { api_base_url } from '../Helper';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else {
        setError(data.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-5 overflow-hidden">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-5xl flex h-full md:h-auto overflow-hidden">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left Side */}
          <div className="left flex flex-col justify-center w-full md:w-[40%] p-10 h-full">
            <img className="w-[150px] mx-auto mb-4" src={logo} alt="Logo" />
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
            <p className="text-center text-gray-500 mb-2">Please login to continue</p>

            <form onSubmit={login} className="space-y-4">
              {/* Email Input */}
              <div className="input-group">
                <div className="relative mt-1">
                  <MdEmail className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-300 shadow-sm hover:shadow-lg h-12" 
                    placeholder="Email"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="input-group">
                <div className="relative mt-1">
                  <MdOutlineWifiPassword className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="w-full pl-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-300 shadow-sm hover:shadow-lg h-12" 
                    placeholder="Password"
                    required
                  />
                  <IoEye className="absolute right-3 top-3 text-gray-400 cursor-pointer" />
                </div>
              </div>

              {/* Error Message */}
              <p className='text-red-500 text-[14px] text-center h-4'>{error}</p>

              {/* Login Button */}
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 h-12">
                Login
              </button>

              {/* Redirect to Sign Up */}
              <p className="text-center text-gray-500 text-sm mt-4">
                Don't have an account?{" "}
                <Link to="/signUp" className="text-blue-500 hover:underline">Sign Up</Link>
              </p>
            </form>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center justify-center w-full md:w-[60%] bg-blue-50 h-full">
            <img src={rightIMG} alt="Login Illustration" className="w-full object-cover h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
