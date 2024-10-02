import React, { useState } from 'react';
import logo from "../images/logo.png";
import { FaUser } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import nameTag from "../images/nameTag.png";
import { MdOutlineWifiPassword } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import rightIMG from "../images/signUpRight.png";
import { api_base_url } from '../Helper';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        phone: phone,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          setError(data.message);
          toast.error(data.message); // Display error message as toast
        } else {
          toast.success("Registration successful!"); // Display success message as toast
          setTimeout(() => {
            navigate("/login");
          }, 1000); // Navigate after 1 second
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100 overflow-hidden">
      <div className="bg-blue shadow-lg rounded-lg w-full max-w-5xl flex h-full">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left Side */}
          <div className="left flex flex-col justify-center w-full md:w-[40%] p-6 md:p-8 h-full">
            <img className='w-[120px] mx-auto mb-4' src={logo} alt="Logo" />
            <h2 className="text-2xl font-semibold text-center mb-4 md:mb-6">Create an Account</h2>

            <form onSubmit={createUser} className="space-y-3 md:space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Username</label>
                <div className="relative mt-1">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <div className="relative mt-1">
                  <img src={nameTag} className="absolute left-3 top-3 w-5 h-5 text-gray-400" alt="" />
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <div className="relative mt-1">
                  <MdEmail className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <div className="relative mt-1">
                  <FaPhone className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <div className="relative mt-1">
                  <MdOutlineWifiPassword className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    placeholder="Enter your password"
                    required
                  />
                  <IoEye className="absolute right-3 top-3 text-gray-400 cursor-pointer" />
                </div>
              </div>

              {/* Error Message */}
              <p className='text-red-500 text-[14px] text-center'>{error}</p>
              <p className="text-center text-gray-500 text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
              </p>

              {/* Sign Up Button */}
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
                Sign Up
              </button>
            </form>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center justify-center w-full md:w-[60%] bg-blue-50 h-full">
            <img src={rightIMG} alt="Sign Up Illustration" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default SignUp;
