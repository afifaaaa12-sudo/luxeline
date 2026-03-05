import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24">

      {/* Heading */}
      <div className="text-3xl text-center pt-6 border-t flex flex-col items-center">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Full background hero */}
      <div
        className="relative my-8 rounded-3xl overflow-hidden h-[500px] md:h-[650px] lg:h-[750px] flex items-center"
        style={{
          backgroundImage: `url(${assets.contact_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* content */}
        <div className="relative z-10 max-w-xl text-white px-8">
          <h2 className="text-4xl font-semibold">Let’s Talk</h2>

          <p className="mt-4 text-gray-200">
            Whether you have a question about products, orders, returns, or
            anything else, our team is ready to answer all your questions.
          </p>

          <Link to="/login">
            <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg hover:scale-105 transition">
              Send Message
            </button>
          </Link>
        </div>
      </div>

      {/* Contact details + form */}
      <div className="grid md:grid-cols-2 gap-12 my-12">
        {/* details */}
        <div className="flex flex-col gap-5 text-gray-600">
          <h2 className="text-2xl font-semibold text-gray-900">Contact Info</h2>

          <p><b>Address:</b> New Delhi, India</p>
          <p><b>Phone:</b> +91 98765 43210</p>
          <p><b>Email:</b> support@luxeline.com</p>
          <p><b>Working Hours:</b> Mon–Sat, 10AM–8PM</p>
        </div>

        {/* form */}
        <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col gap-4">
          <input className="border px-4 py-3 rounded-lg" placeholder="Your Name" />
          <input className="border px-4 py-3 rounded-lg" placeholder="Your Email" />
          <textarea rows="4" className="border px-4 py-3 rounded-lg" placeholder="Message" />

          <Link to="/login">
            <button type="button" className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Send Message
            </button>
          </Link>
        </form>
      </div>

      {/* FAQ */}
      <div className="my-14">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-gray-600">
          <div className="border rounded-xl p-5">
            <p className="font-semibold text-gray-900">How long does delivery take?</p>
            <p className="mt-1 text-sm">Delivery usually takes 3–7 business days depending on location.</p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="font-semibold text-gray-900">Can I return a product?</p>
            <p className="mt-1 text-sm">Yes, we offer a 7-day return policy for unused products.</p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="font-semibold text-gray-900">Do you offer COD?</p>
            <p className="mt-1 text-sm">Yes, Cash on Delivery is available for selected locations.</p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="font-semibold text-gray-900">How can I track my order?</p>
            <p className="mt-1 text-sm">Tracking details are shared via email once your order ships.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
