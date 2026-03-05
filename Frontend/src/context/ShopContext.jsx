import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { products as demoProducts } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");

  const [search, setSearch] = useState("");
  const [showsearch, setShowSearch] = useState(false);
  const [cartitem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const AddToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartitem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartitem) {
      for (const size in cartitem[itemId]) {
        const quantity = cartitem[itemId][size];
        if (quantity > 0) {
          totalCount += quantity;
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartitem);

    if (!cartData[itemId]) return;

    cartData[itemId][size] = quantity;

    setCartItem(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartitem) {
      const productInfo = products.find((p) => p._id.toString() === productId.toString());

      if (!productInfo) continue;

      for (const size in cartitem[productId]) {
        const quantity = cartitem[productId][size];

        if (quantity > 0) {
          totalAmount += productInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success && Array.isArray(response.data.products) && response.data.products.length > 0) {
        setProducts(response.data.products);
      } else {
        setProducts(demoProducts);
      }
    } catch (error) {
      console.log(error);
      setProducts(demoProducts);
    }
  };

  const getUserCart = async (authToken) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token: authToken } });
      if (response.data.success) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUserCart(token);
    } else {
      localStorage.removeItem("token");
      setCartItem({});
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setShowSearch,
    cartitem,
    AddToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItem,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;

