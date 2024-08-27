import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-7">
          <span className="text-black">Create Your Account</span> <br />
          <span className="text-gray-600">and Start Shopping in Style!</span>
        </h2>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="relative">
            <MdEmail className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black transition duration-300"
          >
            Register
          </button>
          <span className="font-medium">Already have an account?</span>{" "}
          <Link to="/login" className="text-gray-500 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
