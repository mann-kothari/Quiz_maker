import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/firebase";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}>
        Quiz Maker
      </div>
      <div className="relative">
        <button
          className="flex items-center px-4 py-2 rounded hover:bg-blue-800 focus:outline-none"
          onClick={() => setOpen((prev) => !prev)}>
          More Options
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-blue-100"
              onClick={() => {
                setOpen(false);
                navigate("/");
              }}>
              Home
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-blue-100"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}>
              Logout
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-blue-100"
              onClick={() => {
                setOpen(false);
                navigate("/about");
              }}>
              About
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
