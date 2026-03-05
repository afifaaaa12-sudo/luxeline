import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="py-12 px-4 md:px-10 lg:px-20">

      {/* Header */}
      <div className="text-center mb-10">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />

        <p className="max-w-2xl mx-auto mt-3 text-sm md:text-base text-gray-600">
          Explore our newest drops featuring trending styles, elevated comfort,
          and statement-ready pieces designed for everyday wear.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {latestProducts.map((item, index) => (
          <div
            key={item._id}
            className="group opacity-0 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg rounded-xl">
              <ProductItem
                _id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default LatestCollection;
