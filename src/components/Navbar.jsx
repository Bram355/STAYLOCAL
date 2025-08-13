import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          StayLocal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center font-bold text-lg">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/listings"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Listings
          </Link>

          {/* Desktop Marketplace Button */}
          <Link
            to="/market"
            className="px-4 py-2 rounded-lg bg-indigo-600 shadow-md text-white hover:bg-indigo-700 hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            🛍️ Marketplace
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center text-gray-300 hover:text-white transition-colors"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full text-white shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-3 rounded-full bg-white/40 hover:bg-white/60 transition text-3xl shadow-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={menuOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="translate-x-full opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="translate-x-full opacity-0"
      >
        <div className="fixed top-0 right-0 h-full w-72 bg-gray-900 shadow-2xl z-50 flex flex-col py-6 px-4 space-y-6 text-lg font-bold text-white">
          
          {/* Menu Close Button */}
          <button
            className="self-end p-2 rounded-full bg-white/20 hover:bg-white/40 text-2xl transition"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          {/* Main Links */}
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link
              to="/listings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              🏘️ Listings
            </Link>
          </div>

          <div className="border-t border-gray-700"></div>

          <div className="flex flex-col space-y-4">
            <Link
              to="/market"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-600 shadow-md hover:bg-indigo-700 hover:shadow-lg transition"
              onClick={() => setMenuOpen(false)}
            >
              🛍️ Marketplace
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition relative"
              onClick={() => setMenuOpen(false)}
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full text-white shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="border-t border-gray-700"></div>

          <div className="flex flex-col space-y-4 mt-auto">
            <Link
              to="/login"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              🔑 Login
            </Link>
          </div>
        </div>
      </Transition>
    </nav>
  );
}
