import React from "react";
import logo from "../assets/logo.png";
import { Form, NavLink } from "react-router-dom";
import { ArrowRightCircleIcon } from "@heroicons/react/16/solid";

const Navbar = ({ userName }) => {
  const storedUser = userName || localStorage.getItem("userName");

  const handleLogout = (e) => {
    if (!confirm("Are you Sure to LogOut")) {
      e.preventDefault();
    }
  };
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <NavLink
        to="/"
        aria-label="Go to Home"
        className="flex items-center gap-2"
      >
        <img src={logo} alt="" className="h-8 w-8" />
        <span className="text-xl font-semibold text-gray-800">
          ExpenseTracker
        </span>
      </NavLink>
      {storedUser && (
        <Form method="post" action="/logout" onSubmit={handleLogout}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
          >
            LogOut
            <ArrowRightCircleIcon className="w-5 h-5" />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Navbar;
