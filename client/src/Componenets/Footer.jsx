import React from "react";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full bg-gray-50 text-gray-600">
      <div className="flex flex-col md:flex-row justify-between w-full gap-12 border-b border-gray-300 pb-10">
        
        {/* Brand Name + Tagline + Socials */}
        <div className="md:max-w-md">
          <h1 className="text-2xl font-bold text-gray-800">AI-Verse</h1>
          <p className="mt-2 text-sm text-gray-500">
            Your all-in-one AI toolkit — generate, edit, and enhance with ease.
          </p>

          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-blue-600 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-500 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition">
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Navigation & newsletter */}
        <div className="flex-1 flex flex-col sm:flex-row justify-start md:justify-end gap-16">
          
          {/* Navigation Links */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-5 text-base">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
              <li><a href="about-us" className="hover:text-blue-600 transition">About Us</a></li>
              <li><a href="contact" className="hover:text-blue-600 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="max-w-md">
            <h2 className="font-semibold text-gray-800 mb-5 text-base">Subscribe to our newsletter</h2>
            <p className="text-sm mb-4">
              Get the latest AI updates, articles, and tools straight to your inbox.
            </p>
            <form className="flex items-center gap-2 w-full max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow h-10 rounded-md px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400 text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-xs md:text-sm pt-6 pb-6 text-gray-500">
        &copy; {new Date().getFullYear()} AI-Verse. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
