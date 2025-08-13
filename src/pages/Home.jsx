import React from "react";
import { Link } from "react-router-dom";
import listings from "../data/listingsData";

function Home() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        StayLocal Listings
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative group">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm shadow-md">
                ${listing.price}/night
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {listing.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {listing.description}
              </p>
              <Link to={`/listing/${listing.id}`}>
                <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300">
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
