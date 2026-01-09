import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="py-30 text-7xl flex justify-center items-center">
        Login
      </div>
      <Link to="/">
        <p className="text-blue-700 text-center text-xl cursor-pointer">
          return
        </p>
      </Link>
    </>
  );
}

export default Login;
