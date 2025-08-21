import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TopModeToggle() {
  const { pathname } = useLocation();
  const isMarket = pathname.startsWith("/market");

  return (
    <div className="fixed top-16 left-0 w-full z-50 flex justify-center px-4">
      <div className="w-full sm:w-auto bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-black/90 backdrop-blur-xl rounded-2xl p-2 flex gap-1 shadow-2xl border border-yellow-400/30 animate-fadeIn menu-glow">
        
        {/* Stays Button */}
        <Link
          to="/"
          className={`flex-1 sm:flex-initial text-center px-6 py-2 rounded-xl font-semibold text-glow transition transform hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] relative
            ${!isMarket
              ? "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black shadow-lg ring-2 ring-yellow-300/80 animate-pulseGlow"
              : "text-gray-300 hover:text-white"}`}
        >
          🏠 Stays
        </Link>

        {/* Marketplace Button */}
        <Link
          to="/market"
          className={`flex-1 sm:flex-initial text-center px-6 py-2 rounded-xl font-semibold text-glow transition transform hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] relative
            ${isMarket
              ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg ring-2 ring-pink-400/80 animate-pulseGlow"
              : "text-gray-300 hover:text-white"}`}
        >
          🛍️ Marketplace
        </Link>
      </div>
    </div>
  );
}
