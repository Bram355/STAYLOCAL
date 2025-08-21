import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TopModeToggle() {
  const { pathname } = useLocation();
  const isMarket = pathname.startsWith("/market");

  return (
    <div className="fixed top-16 left-0 w-full z-50 flex justify-center px-4">
      <div className="w-full sm:w-auto bg-gray-900/60 backdrop-blur-xl rounded-2xl p-1 flex gap-1 shadow-2xl border border-white/10 animate-fadeIn">
        <Link
          to="/"
          className={`flex-1 sm:flex-initial text-center px-6 py-2 rounded-xl font-semibold transition transform hover:scale-105 relative
            ${!isMarket
              ? "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black shadow-lg ring-2 ring-yellow-300/80 animate-pulseSlow"
              : "text-gray-300 hover:text-white"}`}
        >
          🏠 Stays
        </Link>
        <Link
          to="/market"
          className={`flex-1 sm:flex-initial text-center px-6 py-2 rounded-xl font-semibold transition transform hover:scale-105 relative
            ${isMarket
              ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg ring-2 ring-pink-400/80 animate-pulseSlow"
              : "text-gray-300 hover:text-white"}`}
        >
          🛍️ Marketplace
        </Link>
      </div>
    </div>
  );
}
