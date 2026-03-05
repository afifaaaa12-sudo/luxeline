import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartitem, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartdata, setCardData] = useState([]);

  useEffect(() => {
    const tempData = [];

    if (products.length > 0) {
      for (const productId in cartitem) {
        for (const size in cartitem[productId]) {
          if (cartitem[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartitem[productId][size],
            });
          }
        }
      }

      setCardData(tempData);
    }
  }, [cartitem]);

  return (
    <div className="border-t pt-14 max-w-5xl mx-auto px-4">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="flex flex-col gap-4">
        {cartdata.map((item) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );

          if (!productData) return null;

          return (
            <div
              key={item._id + item.size}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* product info */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  className="w-16 sm:w-20 rounded-md"
                  src={productData.image?.[0]}
                  alt=""
                />

                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm sm:text-base">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-4">
                    <p className="text-gray-600 font-semibold">
                      {currency}
                      {productData.price}
                    </p>

                    <span className="px-2 py-1 border rounded-md bg-gray-100 text-xs">
                      {item.size}
                    </span>
                  </div>

                  {/* subtotal */}
                  <p className="text-sm font-medium text-gray-800">
                    {currency}
                    {productData.price * item.quantity}
                  </p>
                </div>
              </div>

              {/* quantity */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
                <input
                  value={item.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > 0) updateQuantity(item._id, item.size, value);
                  }}
                  className="border w-20 px-2 py-1 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-black"
                  type="number"
                  min={1}
                />

                {/* delete icon */}
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  alt=""
                  className="w-5 cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* cart total */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
