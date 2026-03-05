import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        setOrderData([]);
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrderData([]);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 max-w-6xl mx-auto px-4">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.slice(0, 3).map((item, index) => (
          <div
            key={item._id || `${item.orderId || "order"}-${index}`}
            className="py-5 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* left section */}
            <div className="flex items-start gap-5">
              <img
                className="w-16 sm:w-20 rounded"
                src={item.image?.[0]}
                alt=""
              />

              <div className="text-sm">
                <p className="font-medium text-gray-800">{item.name}</p>

                <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-600">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.date).toDateString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.paymentMethod}
                </p>
              </div>
            </div>

            {/* status */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {item.status}
            </div>

            {/* button */}
            <button
              onClick={loadOrderData}
              className="border px-4 py-2 text-sm rounded hover:bg-black hover:text-white transition"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
