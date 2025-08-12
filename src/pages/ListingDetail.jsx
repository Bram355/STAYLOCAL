import React from "react";
import { useParams } from "react-router-dom";
import listings from "../data/listingsData";

function ListingDetail() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);

  if (!listing)
    return (
      <p className="text-center text-red-500 mt-10 text-lg font-semibold">
        Listing not found
      </p>
    );

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(listing);
    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${listing.title} has been added to your cart!`);
  };

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white rounded-xl shadow-2xl">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-4 text-center drop-shadow-lg">
        {listing.title}
      </h1>

      <div className="relative group">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-72 sm:h-96 object-cover rounded-xl shadow-lg transform group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-500 rounded-xl"></div>
      </div>

      <p className="mt-6 text-lg text-gray-300 leading-relaxed">
        {listing.description}
      </p>

      <p className="text-yellow-400 font-bold text-2xl mt-4">
        ${listing.price}{" "}
        <span className="text-gray-400 font-medium">/ night</span>
      </p>

      <button
        onClick={handleAddToCart}
        className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-black font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-yellow-500/50"
      >
        Book Now
      </button>
    </div>
  );
}

export default ListingDetail;
