import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <nav className="bg-black/50 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient drop-shadow-lg"
        >
          StayLocal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center font-medium">
          <Link to="/" className="hover:text-pink-300 transition">Home</Link>
          <Link to="/listings" className="hover:text-pink-300 transition">Listings</Link>
          
          {/* Marketplace Toggle */}
          <Link 
            to="/market" 
            className="px-3 py-1 rounded-full border border-pink-400 hover:bg-pink-500 hover:text-white transition shadow-lg"
          >
            Marketplace
          </Link>

          <Link to="/cart" className="relative hover:text-pink-300 flex items-center transition">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full text-white shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="hover:text-pink-300 transition">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/60 backdrop-blur-md shadow-md py-4 px-6 space-y-4 font-medium text-white">
          <Link to="/" className="block hover:text-pink-300" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/listings" className="block hover:text-pink-300" onClick={() => setMenuOpen(false)}>Listings</Link>
          <Link to="/market" className="block px-3 py-1 rounded-full border border-pink-400 hover:bg-pink-500 hover:text-white transition" onClick={() => setMenuOpen(false)}>Marketplace</Link>
          <Link to="/cart" className="block relative hover:text-pink-300" onClick={() => setMenuOpen(false)}>
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute ml-1 bg-red-500 text-xs px-2 py-0.5 rounded-full text-white shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="block hover:text-pink-300" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
}
