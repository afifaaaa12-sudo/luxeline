import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5173";

  const { setShowSearch, getCartCount, token, setToken, setCartItem } = useContext(ShopContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    setDropdown(false);
    navigate("/login");
  };

  return (
    <>
      <SearchBar />

      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/20 border-b border-white/20 flex items-center justify-between py-2 px-3 sm:px-4">
        <Link to="/" className="transition-transform duration-300 hover:scale-105">
          <img src={assets.logo} className="w-24 h-auto" alt="logo" />
        </Link>

        <ul className="hidden sm:flex gap-6 text-sm font-medium text-gray-800">
          <li><NavLink className="nav-anim" to="/">HOME</NavLink></li>
          <li><NavLink className="nav-anim" to="/collection">COLLECTION</NavLink></li>
          <li><NavLink className="nav-anim" to="/about">ABOUT</NavLink></li>
          <li><NavLink className="nav-anim" to="/contact">CONTACT</NavLink></li>
          <li>
            <a className="nav-anim" href={adminUrl} target="_blank" rel="noreferrer">ADMIN</a>
          </li>
        </ul>

        <div className="flex items-center gap-3 sm:gap-4 relative">
          <img
            onClick={() => {
              setShowSearch(true);
              navigate("/collection");
            }}
            src={assets.search_icon}
            className="w-4 cursor-pointer transition-transform duration-200 hover:scale-110"
            alt=""
          />

          <div className="relative">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer transition-transform duration-200 hover:scale-110"
              alt="profile"
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  setDropdown(!dropdown);
                }
              }}
            />

            {token && dropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg text-sm z-50 animate-fadeUp">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdown(false)}>
                  My Profile
                </Link>

                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdown(false)}>
                  Orders
                </Link>

                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="relative transition-transform duration-200 hover:scale-105">
            <Link to="/cart">
              <img src={assets.cart_icon} className="w-5" alt="cart" />
            </Link>

            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          </div>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden transition-transform duration-200 hover:scale-110"
            alt=""
          />
        </div>
      </div>

      {visible && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setVisible(false)} />}

      <div
        className={`fixed top-0 right-0 h-full w-[80vw] max-w-64 bg-white shadow-lg transition-transform duration-300 z-50 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setVisible(false)} className="text-xl">
            X
          </button>
        </div>

        <ul className="flex flex-col gap-6 px-6 text-lg">
          <li><NavLink className="nav-anim" onClick={() => setVisible(false)} to="/">HOME</NavLink></li>
          <li><NavLink className="nav-anim" onClick={() => setVisible(false)} to="/collection">COLLECTION</NavLink></li>
          <li><NavLink className="nav-anim" onClick={() => setVisible(false)} to="/about">ABOUT</NavLink></li>
          <li><NavLink className="nav-anim" onClick={() => setVisible(false)} to="/contact">CONTACT</NavLink></li>
          <li>
            <a className="nav-anim" href={adminUrl} target="_blank" rel="noreferrer" onClick={() => setVisible(false)}>
              ADMIN
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
