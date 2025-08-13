import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TopModeToggle() {
  const { pathname } = useLocation();
  const isMarket = pathname.startsWith("/market");

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="bg-gray-700/60 backdrop-blur rounded-2xl p-1 flex gap-1">
          <Link
            to="/"
            className={`flex-1 text-center py-2 rounded-xl font-semibold transition
              ${!isMarket ? "bg-yellow-400 text-black shadow" : "text-gray-300 hover:text-white"}`}
          >
            🏠 Stays
          </Link>
          <Link
            to="/market"
            className={`flex-1 text-center py-2 rounded-xl font-semibold transition
              ${isMarket ? "bg-yellow-400 text-black shadow" : "text-gray-300 hover:text-white"}`}
          >
            🛍️ Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
