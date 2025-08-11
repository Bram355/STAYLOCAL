import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo / Home Link */}
      <Link to="/" className="text-xl font-bold hover:text-gray-300">
        StayLocal
      </Link>

      {/* Nav Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/listings" className="hover:text-gray-300">
          Listings
        </Link>

        {/* Cart Link */}
        <Link
          to="/cart"
          className="relative hover:text-gray-300 flex items-center"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
