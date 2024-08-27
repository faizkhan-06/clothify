import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchIconOpen, setIsSearchIconOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 bg-white my-4 py-2 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] ">
        <div className=" flex items-center">
          <h1 className=" font-dancingScript text-xl font-bold">Clothify</h1>
        </div>
        <div className=" hidden sm:flex sm:list-none sm:gap-5 sm:justify-center items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? " border-black border-b-[1px] font-medium" : ""
            }
          >
            <li className="">Home</li>
          </NavLink>
          <NavLink
            to="/men"
            className={({ isActive }) =>
              isActive ? "border-black border-b-[1px] font-medium" : ""
            }
          >
            <li className="">Men</li>
          </NavLink>
          <NavLink
            to="/women"
            className={({ isActive }) =>
              isActive ? "border-black border-b-[1px] font-medium" : ""
            }
          >
            <li>Women</li>
          </NavLink>
          <NavLink
            to="/kids"
            className={({ isActive }) =>
              isActive ? "border-black border-b-[1px] font-medium" : ""
            }
          >
            <li>Kids</li>
          </NavLink>
        </div>
        <div className=" flex justify-end items-center gap-4">
          <IoSearch
            className=" text-xl cursor-pointer"
            onClick={() => setIsSearchIconOpen(!isSearchIconOpen)}
          />
          <FaOpencart className=" hidden sm:block md:block text-xl" />
          <IoBagHandleOutline className=" hidden sm:block  text-xl" />
          <Link to="/login">
            <LuUser2 className=" text-xl" />
          </Link>
          <FiMenu
            className=" sm:hidden text-xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>
      {isSearchIconOpen && (
        <div className="flex justify-center my-2">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <IoSearch className="text-xl" />
            </button>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform transform translate-x-0 z-50">
          <div className="flex justify-end items-center p-4 border-b">
            <button onClick={() => setIsMenuOpen(false)} className="text-xl">
              &times;
            </button>
          </div>
          <ul className="p-4 space-y-2 flex flex-col">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "  font-medium " : "")}
              onClick={() => setIsMenuOpen(false)}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/men"
              className={({ isActive }) => (isActive ? "  font-medium " : "")}
              onClick={() => setIsMenuOpen(false)}
            >
              <li>Men</li>
            </NavLink>
            <NavLink
              to="/women"
              className={({ isActive }) => (isActive ? "  font-medium " : "")}
              onClick={() => setIsMenuOpen(false)}
            >
              <li>Women</li>
            </NavLink>
            <NavLink
              to="/kids"
              className={({ isActive }) => (isActive ? "  font-medium " : "")}
              onClick={() => setIsMenuOpen(false)}
            >
              <li>Kids</li>
            </NavLink>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
