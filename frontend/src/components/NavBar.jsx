import React from "react";
import { NavLink, Link } from "react-router-dom";
import Header from "./Header";
import {
  Home,
  User,
  Phone,
  Store,
  Layers
} from "lucide-react";

function NavBar() {
  return (
    <>
      {/* desktop */}
      <nav className="hidden md:flex fixed top-6 left-4 right-4 z-50 backdrop-blur-xl shadow-lg border rounded-2xl px-6 py-4 justify-between items-center border-white/20">
        <p className="text-2xl font-bold">MarketPro</p>

        <ul className="flex space-x-8 font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-1 font-bold text-blue-700"
                  : "flex gap-1 hover:text-blue-700"
              }
            >
              <Home className="w-5" />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-1 font-bold text-blue-700"
                  : "flex gap-1 hover:text-blue-700"
              }
            >
              <Layers className="w-5" />
              Categories
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sellers"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-1 font-bold text-blue-700"
                  : "flex gap-1 hover:text-blue-700"
              }
            >
              <Store className="w-5" />
              Sellers
            </NavLink>
          </li>


          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-1 font-bold text-blue-700"
                  : "flex gap-1 hover:text-blue-700"
              }
            >
              <Phone className="w-5" />
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="flex gap-5">
          <Link to={"/SellerProfile"}><div className="w-9 h-9 rounded-full border p-0.5 flex items-center justify-center bg-blue-100 border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-white cursor-pointer">
            <User className="w-6" /> 
          </div></Link>

         <Link to="/Login"> <button className="rounded-md font-semibold px-3 py-1 bg-blue-100 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white">
            Connexion
          </button></Link>
        </div>
      </nav>

      {/* mobile */}


      <Header />
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
        <ul className="flex justify-around py-2 text-xs font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? "text-blue-700" : "text-gray-600"
                }`
              }
            >
              <Home className="w-6" />
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? "text-blue-700" : "text-gray-600"
                }`
              }
            >
              <Layers className="w-6" />
              <span>Categories</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sellers"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? "text-blue-700" : "text-gray-600"
                }`
              }
            >
              <Store className="w-6" />
              <span>Sellers</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? "text-blue-700" : "text-gray-600"
                }`
              }
            >
              <Phone className="w-6" />
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
