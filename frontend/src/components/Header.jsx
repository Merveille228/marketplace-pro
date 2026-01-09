import React from "react";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="md:hidden flex justify-between fixed py-5 left-1 right-1 backdrop-blur-2xl">
      <div>
        <p className="text-2xl font-bold">MarketPro</p>
      </div>
      <Link to={"/SellerProfile"}>
        <div className="px-2 w-10 h-10 flex gap-6 rounded-full items-center bg-blue-100 text-blue-500">
          <User className=" w-6" />
        </div>
      </Link>
    </div>
  );
}

export default Header;
