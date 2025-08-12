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
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-500">
          StayLocal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <Link to="/listings" className="hover:text-pink-500">Listings</Link>
          <Link to="/cart" className="relative hover:text-pink-500 flex items-center">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="hover:text-pink-500">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4 text-gray-700 font-medium">
          <Link to="/" className="block hover:text-pink-500" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/listings" className="block hover:text-pink-500" onClick={() => setMenuOpen(false)}>Listings</Link>
          <Link to="/cart" className="block hover:text-pink-500 relative" onClick={() => setMenuOpen(false)}>
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute ml-1 bg-red-500 text-xs px-2 py-0.5 rounded-full text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="block hover:text-pink-500" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
}
