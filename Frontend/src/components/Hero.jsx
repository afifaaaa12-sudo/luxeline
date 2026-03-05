import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[420px] sm:min-h-[500px] md:min-h-[620px] lg:min-h-[720px] flex items-center overflow-hidden">
      <style>{`
        @keyframes heroZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.04); }
        }
        @keyframes glowFloat {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-18px); opacity: 0.85; }
        }
        .hero-zoom {
          animation: heroZoom 14s ease-in-out infinite alternate;
          will-change: transform;
          transform-origin: left center;
          background-position: 30% center;
        }
        @media (min-width: 768px) {
          .hero-zoom {
            transform-origin: center center;
            background-position: center;
          }
        }
        .hero-glow {
          animation: glowFloat 6s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>

      <div
        className="hero-zoom absolute inset-0"
        style={{
          backgroundImage: `url(${assets.hero_img})`,
          backgroundSize: "cover",
        }}
      />

      <div className="hero-glow absolute -right-16 top-16 h-40 w-40 rounded-full bg-white/25 blur-3xl" />

      <div className="absolute inset-0 bg-black/40 md:bg-black/30" />

      <div className="relative z-10 px-5 sm:px-10 md:px-16 max-w-lg md:max-w-xl lg:max-w-2xl text-white">
        <div className="flex items-center gap-2 mb-2 opacity-0 animate-fadeUp">
          <span className="w-8 md:w-10 h-[2px] bg-white"></span>
          <p className="text-xs sm:text-sm tracking-wide">OUR BESTSELLER</p>
        </div>

        <h1 className="prata-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-3 opacity-0 animate-fadeUp delay-200">
          Latest Arrivals
        </h1>

        <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-5 opacity-0 animate-fadeUp delay-300">
          Discover premium styles crafted for comfort, confidence, and everyday elegance.
        </p>

        <Link to="/collection">
          <button className="bg-white text-black px-5 sm:px-6 py-2 sm:py-3 rounded-md transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/30 opacity-0 animate-fadeUp delay-500">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;



