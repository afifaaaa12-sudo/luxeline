import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <aside className="w-full md:w-52 md:min-h-[calc(100vh-64px)] bg-white border-b md:border-b-0 md:border-r shadow-sm">
      
      <div className="flex md:flex-col gap-2 p-3 md:p-4 text-sm font-medium overflow-x-auto md:overflow-visible">
        
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap min-w-[120px] md:min-w-0
             ${
               isActive
                 ? "bg-indigo-600 text-white shadow-sm"
                 : "text-gray-600 hover:bg-gray-100"
             }`
          }
        >
          <img src={assets.add_icon} alt="" className="w-4 h-4" />
          <span>Add Items</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap min-w-[120px] md:min-w-0
             ${
               isActive
                 ? "bg-indigo-600 text-white shadow-sm"
                 : "text-gray-600 hover:bg-gray-100"
             }`
          }
        >
          <img src={assets.order_icon} alt="" className="w-4 h-4" />
          <span>List Items</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap min-w-[120px] md:min-w-0
             ${
               isActive
                 ? "bg-indigo-600 text-white shadow-sm"
                 : "text-gray-600 hover:bg-gray-100"
             }`
          }
        >
          <img src={assets.order_icon} alt="" className="w-4 h-4" />
          <span>Orders</span>
        </NavLink>

      </div>
    </aside>
  );
};

export default Sidebar;
