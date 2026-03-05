import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24">

      {/* Heading */}
      <div className="text-3xl text-center pt-4 border-t flex flex-col items-center">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Background hero */}
      <div
        className="relative my-8 rounded-3xl overflow-hidden h-[500px] md:h-[650px] lg:h-[750px] flex items-center"
        style={{
          backgroundImage: `url(${assets.about_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* content */}
        <div className="relative z-10 max-w-xl text-white px-8">
          <h2 className="text-4xl font-semibold">Redefining Modern Fashion</h2>

          <p className="mt-4 text-gray-200">
            We blend craftsmanship with modern design to create clothing that
            adapts effortlessly to everyday life while maintaining elegance and
            comfort.
          </p>

          <div className="mt-6 bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl">
            <h3 className="font-semibold text-lg">Our Mission</h3>
            <p className="mt-2 text-gray-200">
              Deliver accessible premium fashion while embracing sustainability,
              affordability, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-16">
        <h2 className="text-2xl text-center font-semibold mb-10">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Premium Fabric",
              desc: "Carefully selected materials ensuring durability and comfort.",
            },
            {
              title: "Trend Driven",
              desc: "Inspired by global fashion while staying timeless.",
            },
            {
              title: "Customer First",
              desc: "Fast delivery and reliable support for seamless shopping.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-500"
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pb-16">
        {[
          { n: "10K+", t: "Customers" },
          { n: "500+", t: "Products" },
          { n: "4.8★", t: "Ratings" },
          { n: "24/7", t: "Support" },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-white to-gray-100 p-7 rounded-2xl border shadow-lg hover:scale-105 transition duration-500"
          >
            <h2 className="text-3xl font-bold">{s.n}</h2>
            <p className="text-gray-500 mt-1">{s.t}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default About;