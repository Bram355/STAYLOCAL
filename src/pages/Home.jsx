import React from "react";
import { Link } from "react-router-dom";
import listings from "../data/listingsData";

function Home() {
  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-black to-gray-950 min-h-screen text-white">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
        ✨ StayLocal Listings ✨
      </h1>

      {/* Listings Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-yellow-400/50 transition transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] duration-300"
          >
            {/* Image */}
            <div className="relative group">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm shadow-lg animate-pulseGlow">
                ${listing.price}/night
              </span>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-white drop-shadow-sm">
                {listing.title}
              </h3>
              <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                {listing.description}
              </p>
              <Link to={`/listing/${listing.id}`}>
                <button className="mt-5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-2.5 rounded-xl hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300">
                  View Details 🚀
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
