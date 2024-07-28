import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaSearch } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-100 to-rose-100 text-yellow-800 py-12 select-none">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-rose-600">About Glow Beauty</h3>
            <p className="text-sm leading-relaxed">
              Discover your perfect glow with our curated collection of premium beauty products. From skincare to makeup, we've got everything you need to enhance your natural beauty.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-rose-600">Beauty Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products/skincare" className="hover:text-rose-500 transition duration-300">Skincare</Link></li>
              <li><Link to="/products/makeup" className="hover:text-rose-500 transition duration-300">Makeup</Link></li>
              <li><Link to="/products/haircare" className="hover:text-rose-500 transition duration-300">Hair Care</Link></li>
              <li><Link to="/products/fragrance" className="hover:text-rose-500 transition duration-300">Fragrance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-rose-600">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-yellow-600 hover:text-rose-500 transition duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-yellow-600 hover:text-rose-500 transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-yellow-600 hover:text-rose-500 transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-yellow-600 hover:text-rose-500 transition duration-300">
                <FaPinterestP size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-rose-600">Beauty Insider</h3>
            <p className="text-sm mb-4">Join our beauty community for exclusive offers and tips!</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-l focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button
                type="submit"
                className="bg-rose-500 text-white px-4 py-2 rounded-r hover:bg-rose-600 transition duration-300"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-yellow-200 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Glow Beauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;