import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 mt-7 py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">About Clothify</h2>
            <p className="text-gray-600">
              Clothify brings you the finest selection of stylish clothing for
              men, women, and kids. Explore our latest collection and redefine
              your fashion game.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/about" className="hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-gray-900">
                  Shop
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-900">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-900">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4 text-gray-600">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-900"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-900"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-900"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-900"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Clothify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
