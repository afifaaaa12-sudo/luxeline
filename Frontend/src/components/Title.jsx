import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-3 items-center mb-3 group cursor-default">
      
      {/* text */}
      <p className="text-gray-500 text-lg tracking-wide transition duration-500 group-hover:text-gray-700">
        {text1}{" "}
        <span className="text-gray-800 font-semibold transition duration-500 group-hover:text-black">
          {text2}
        </span>
      </p>

      {/* animated line */}
      <span className="relative w-10 sm:w-14 h-[2px] bg-gray-400 overflow-hidden">
        <span className="absolute inset-0 bg-gray-900 scale-x-0 group-hover:scale-x-100 origin-left transition duration-500" />
      </span>
    </div>
  );
};

export default Title;
