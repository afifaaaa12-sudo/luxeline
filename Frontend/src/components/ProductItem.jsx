import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ _id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="card-lift rounded-lg">
      <Link to={`/product/${_id}`} className="group text-gray-700 cursor-pointer block">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-in-out"
          />
        </div>

        <p className="pt-3 pb-1 text-sm transition-colors duration-300 group-hover:text-black">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
