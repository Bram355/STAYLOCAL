import { useState } from "react";
import { Link } from "react-router-dom";
import listings from "../data/listingsData";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(search.toLowerCase()) ||
    listing.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Find Your Perfect Stay</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by location or title..."
        className="border border-gray-300 rounded p-2 w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Listings */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-green-600 font-bold">${listing.price} / night</p>
              <Link
                to={`/listing/${listing.id}`}
                className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
