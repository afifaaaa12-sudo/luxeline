import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/list"
      );

      console.log("API Response:", response.data); // Always log once while debugging

      if (response.data.success) {
        // IMPORTANT: Make sure this matches your backend key
        setList(response.data.products || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) =>{
   try {
      const response = await axios.post(backendUrl + "/api/product/remove" ,{id}, {headers:{token}} )


      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }

   } catch (error) {
    console.log(error);
    toast.error(error.message)
    
   }

  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 text-lg font-semibold">All Products List</p>

      <div className="flex flex-col gap-2">

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium rounded">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, index) => (
            <React.Fragment key={item._id || index}>
              <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border text-sm rounded hover:bg-gray-50 transition">
                <img
                  src={item.image && item.image.length > 0 ? item.image[0] : ""}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <p className="truncate">{item.name}</p>
                <p>{item.category}</p>
                <p>
                  {currency}
                  {item.price}
                </p>
                <p onClick={()=>removeProduct(item._id)} className="text-center text-red-500 cursor-pointer hover:scale-110 transition">
                  X
                </p>
              </div>

              <div className="md:hidden border rounded p-3 bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image && item.image.length > 0 ? item.image[0] : ""}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-sm">
                      {currency}
                      {item.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="mt-3 w-full border border-red-400 text-red-500 rounded py-1.5 text-sm"
                >
                  Remove
                </button>
              </div>
            </React.Fragment>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No products found.</p>
        )}
      </div>
    </>
  );
};

export default List;
