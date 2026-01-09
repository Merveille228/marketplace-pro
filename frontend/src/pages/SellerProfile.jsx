import React from "react";
import { Link } from "react-router-dom";
function SellerProfile() {
  return (
    <>
      <div className="py-30">Sprofile</div>
      <Link to="/">
        <p className="text-blue-700 text-center text-xl cursor-pointer">
          return
        </p>
      </Link>
      <Link to="/Login">
        <button className="rounded-md font-semibold px-3 py-1 bg-blue-100 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white">
          Connexion
        </button>
      </Link>
    </>
  );
}

export default SellerProfile;
