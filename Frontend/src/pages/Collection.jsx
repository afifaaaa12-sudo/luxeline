import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const normalize = (str) => str?.toLowerCase().replace(/\s/g, "");

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext);

  const [showfilters, setShowFilters] = useState(false);
  const [filterproducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    const value = normalize(e.target.value);
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = normalize(e.target.value);
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let fp = [...products];

    if (category.length)
      fp = fp.filter((i) => category.includes(normalize(i.category)));

    if (subCategory.length)
      fp = fp.filter((i) => subCategory.includes(normalize(i.subCategory)));

    if (showsearch && search)
      fp = fp.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );

    if (sortType === "low-high") fp.sort((a, b) => a.price - b.price);
    if (sortType === "high-low") fp.sort((a, b) => b.price - a.price);

    setFilterProducts(fp);
  }, [products, category, subCategory, sortType, search, showsearch]);

  return (
    <div className="pt-10 border-t px-4 md:px-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <Title text1={"ALL"} text2={"COLLECTIONS"} />

        <div className="flex w-full sm:w-auto gap-3">
          {/* Filter button */}
          <button
            onClick={() => setShowFilters(true)}
            className="border px-4 py-2 rounded-md flex items-center justify-center gap-2 flex-1 sm:flex-none"
          >
            FILTER
            <img src={assets.dropdown_icon} className="h-3" alt="" />
          </button>

          {/* Sort */}
          <select
            className="border px-3 py-2 rounded-md text-sm flex-1 sm:flex-none"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterproducts.map((item) => (
          <ProductItem
            key={item._id}
            _id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      {/* FILTER MODAL */}
      {showfilters && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white w-72 p-6 h-full overflow-y-auto">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button onClick={() => setShowFilters(false)}>✕</button>
            </div>

            {/* Category */}
            <div className="mb-6">
              <p className="font-medium mb-2">CATEGORIES</p>
              {["Men", "Women", "Kids"].map((item) => (
                <label key={item} className="flex gap-2 text-sm">
                  <input type="checkbox" value={item} onChange={toggleCategory}/>
                  {item}
                </label>
              ))}
            </div>

            {/* Type */}
            <div>
              <p className="font-medium mb-2">TYPE</p>
              {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                <label key={item} className="flex gap-2 text-sm">
                  <input type="checkbox" value={item} onChange={toggleSubCategory}/>
                  {item}
                </label>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
