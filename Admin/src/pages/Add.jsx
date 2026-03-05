import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const [images, setImages] = useState([null, null, null, null]);
  const [sizes, setSizes] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleImageChange = (file, index) => {
    if (!file) return;
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !description || !price) {
      toast.error("Please fill all required fields");
      return;
    }

    if (sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    if (images.every((img) => img === null)) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img);
        }
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token: token, // change to Authorization if backend requires Bearer
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubcategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-3 sm:p-6">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-xl p-4 sm:p-8 space-y-6"
      >
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Product
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in product details and upload images
          </p>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Upload Images
          </p>

          <div className="flex gap-3 flex-wrap">
            {images.map((image, index) => (
              <label
                key={index}
                htmlFor={`image${index}`}
                className="group w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer overflow-hidden hover:border-indigo-500 hover:bg-indigo-50 transition"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={assets.upload_area}
                    alt=""
                    className="w-7 opacity-60 group-hover:opacity-100 transition"
                  />
                )}

                <input
                  type="file"
                  hidden
                  id={`image${index}`}
                  onChange={(e) =>
                    handleImageChange(e.target.files[0], index)
                  }
                />
              </label>
            ))}
          </div>
        </div>

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full max-w-xl border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            required
            className="w-full max-w-xl border border-gray-300 rounded-lg px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* CATEGORY + SUBCATEGORY + PRICE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* SIZES */}
        <div className="flex gap-2 flex-wrap">
          {sizeOptions.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-4 py-1.5 rounded-full border text-sm transition ${
                sizes.includes(size)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-indigo-500 hover:text-indigo-600"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* BESTSELLER */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller((prev) => !prev)}
            className="w-4 h-4 accent-indigo-600"
          />
          <label className="text-sm text-gray-700">
            Add to bestseller
          </label>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-md transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
