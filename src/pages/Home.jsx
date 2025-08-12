import React from "react";
import { Link } from "react-router-dom";
import listings from "../data/listingsData";

function Home() {
  return (
    <div className="pt-20 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen text-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-8 text-center drop-shadow-lg">
        StayLocal Listings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/40 transform hover:scale-105 transition duration-500"
          >
            <div className="relative group overflow-hidden rounded-t-xl">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-56 object-cover transform transition duration-500 group-hover:scale-110 group-hover:brightness-110 shadow-lg"
              />
            </div>

            <div className="p-4">
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                {listing.title}
              </h3>
              <p className="text-gray-300 mb-4">{listing.description}</p>
              <p className="text-yellow-300 font-semibold mb-4">
                ${listing.price}{" "}
                <span className="text-gray-400 font-medium">/ night</span>
              </p>

              <Link to={`/listing/${listing.id}`}>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-black font-bold py-2 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-yellow-500/50">
                  View Details
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
