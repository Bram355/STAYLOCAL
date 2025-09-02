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
      <div className="p-6 text-center text-red-400 font-semibold">
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
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">🛠 Admin Panel</h2>

      {/* Add Listing Form */}
      <div className="mb-8 bg-gray-800 p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-3">Add New Listing</h3>
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-2 p-2 rounded bg-gray-700"
          value={newListing.title}
          onChange={(e) =>
            setNewListing({ ...newListing, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full mb-2 p-2 rounded bg-gray-700"
          value={newListing.description}
          onChange={(e) =>
            setNewListing({ ...newListing, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full mb-2 p-2 rounded bg-gray-700"
          value={newListing.image}
          onChange={(e) =>
            setNewListing({ ...newListing, image: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full mb-2 p-2 rounded bg-gray-700"
          value={newListing.price}
          onChange={(e) =>
            setNewListing({ ...newListing, price: e.target.value })
          }
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
        >
          ➕ Add Listing
        </button>
      </div>

      {/* Manage Listings */}
      <h3 className="text-lg font-semibold mb-3">Current Listings</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-gray-800 rounded-xl p-4 shadow-md relative"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="h-40 w-full object-cover rounded"
            />
            <h4 className="font-bold mt-3">{listing.title}</h4>
            <p className="text-sm text-gray-300">{listing.description}</p>
            <p className="mt-1 font-semibold text-yellow-400">
              ${listing.price}/night
            </p>
            <button
              onClick={() => handleDelete(listing.id)}
              className="absolute top-2 right-2 bg-red-500 px-3 py-1 text-sm rounded hover:bg-red-600 transition"
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
