import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formatItemLine = (item) => {
    const name = item?.name || item?.title || item?.productName || "Item";
    const quantity = item?.quantity ?? item?.qty ?? item?.count ?? 1;
    const size = item?.size || item?.variant || "";
    return `${name} x ${quantity}${size ? ` (${size})` : ""}`;
  };

  const fetchAllOrders = async () => {
    if (!token) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token }, timeout: 8000 }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setOrders([]);
        setErrorMsg(response.data.message || "Failed to fetch orders");
        toast.error(response.data.message);
      }
    } catch (error) {
      setOrders([]);
      const message =
        error?.code === "ECONNABORTED"
          ? "Backend server not responding."
          : error.message || "Something went wrong";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-3 sm:p-6 w-full">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-700">
        Orders Dashboard
      </h3>

      {loading && (
        <div className="text-gray-500 text-center py-10">
          Loading orders...
        </div>
      )}

      {!loading && errorMsg && (
        <div className="text-red-500 text-center py-6">{errorMsg}</div>
      )}

      {!loading && !errorMsg && orders.length === 0 && (
        <div className="text-gray-500 text-center py-6">
          No orders available.
        </div>
      )}

      <div className="flex flex-col gap-5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid lg:grid-cols-[70px_2fr_1.5fr_1fr_1fr] md:grid-cols-2 grid-cols-1 gap-4 border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            {/* Parcel Icon */}
            <div className="flex items-start md:items-center">
              <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-12 h-12 object-contain"
              />
            </div>

            {/* Items */}
            <div>
              <p className="font-medium text-gray-700 mb-1">Items</p>
              {(order.items || []).length > 0 ? (
                order.items.map((item, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {formatItemLine(item)}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No item details in this order
                </p>
              )}
            </div>

            {/* Address */}
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-700">
                {`${order?.address?.firstName || ""} ${
                  order?.address?.lastName || ""
                }`.trim()}
              </p>
              <p>{order?.address?.street}</p>
              <p>
                {order?.address?.city}, {order?.address?.state}
              </p>
              <p>{order?.address?.country}</p>
              <p>{order?.address?.phone}</p>
            </div>

            {/* Order Info */}
            <div className="text-sm text-gray-600">
              <p>Items: {order?.items?.length || 0}</p>
              <p>Method: {order?.paymentMethod || "COD"}</p>
              <p>Payment: {order?.payment ? "Completed" : "Pending"}</p>
              <p>
                Date:{" "}
                {order?.date
                  ? new Date(order.date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            {/* Amount + Status */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-700">
                {currency}{order?.amount || 0}
              </p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
