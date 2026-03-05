import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({setToken}) => {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 sm:px-6">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img src={assets.logo} alt="Logo" className="h-7 sm:h-8 object-contain" />
        <h1 className="text-lg font-semibold text-gray-700 hidden sm:block">
          Admin Panel
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        <button onClick={()=>setToken('')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm">
          Logout
        </button>

      </div>
    </header>
  );
};

export default Navbar;
