import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="fixed top-6 left-4 right-4 z-50 backdrop-blur-xl shadow-lg border rounded-2xl  px-6 py-4 flex justify-between items-center border-white/20 gradient-border">
      <p className="text-2xl font-bold">MarketPro</p>
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/sellers"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Sellers
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"
          }
        >
          Register
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
