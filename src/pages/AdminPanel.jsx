import React, { useState } from "react";
import listingsData from "../data/listingsData";

export default function AdminPanel({ isAdmin }) {
  const [listings, setListings] = useState(
    Array.isArray(listingsData) ? listingsData : []
  );
  const [newListing, setNewListing] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    price: "",
  });

  if (!isAdmin) {
    return (
      <div className="p-6 text-center text-red-400 font-semibold text-xl">
        ❌ You do not have permission to manage listings.
      </div>
    );
  }

  // Handle Add
  const handleAdd = () => {
    if (!newListing.title || !newListing.image || !newListing.price) {
      alert("Please fill all fields!");
      return;
    }
    setListings([
      ...listings,
      { ...newListing, id: Date.now().toString() },
    ]);
    setNewListing({
      id: "",
      title: "",
      description: "",
      image: "",
      price: "",
    });
  };

  // Handle Delete
  const handleDelete = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-black to-gray-950 min-h-screen text-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
        🛠 Admin Panel
      </h2>

      {/* Add Listing Form */}
      <div className="mb-12 bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-white/10">
        <h3 className="text-2xl font-semibold mb-5 text-yellow-400">
          ➕ Add New Listing
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
            value={newListing.title}
            onChange={(e) =>
              setNewListing({ ...newListing, title: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 outline-none"
            value={newListing.price}
            onChange={(e) =>
              setNewListing({ ...newListing, price: e.target.value })
            }
          />
        </div>
        <input
          type="text"
          placeholder="Description"
          className="w-full mt-3 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
          value={newListing.description}
          onChange={(e) =>
            setNewListing({ ...newListing, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full mt-3 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-400 outline-none"
          value={newListing.image}
          onChange={(e) =>
            setNewListing({ ...newListing, image: e.target.value })
          }
        />
        <button
          onClick={handleAdd}
          className="mt-5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-3 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all"
        >
          🚀 Add Listing
        </button>
      </div>

      {/* Manage Listings */}
      <h3 className="text-2xl font-semibold mb-6 text-center text-pink-400">
        📦 Current Listings
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:border-pink-400/50 transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative">
              <img
                src={listing.image}
                alt={listing.title}
                className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => handleDelete(listing.id)}
                className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 px-3 py-1 rounded-lg shadow-md hover:scale-110 transition"
              >
                🗑 Delete
              </button>
            </div>
            <div className="p-5">
              <h4 className="text-xl font-bold">{listing.title}</h4>
              <p className="text-sm text-gray-300 mt-1">
                {listing.description}
              </p>
              <p className="mt-2 font-semibold text-yellow-400 text-lg">
                ${listing.price}/night
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
