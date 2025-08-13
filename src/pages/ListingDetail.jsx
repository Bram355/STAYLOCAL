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
    <div className="pt-32 px-4 max-w-4xl mx-auto bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white rounded-2xl shadow-2xl animate-fadeIn">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-[0_0_25px_#ff00ff] animate-pulse">
        {listing.title}
      </h1>

      <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition duration-500 rounded-2xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-500 rounded-2xl"></div>

        <span className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold px-4 py-2 rounded-2xl shadow-lg animate-pulse text-lg sm:text-xl">
          ${listing.price} / night
        </span>
      </div>

      <p className="mt-6 text-lg text-gray-300 leading-relaxed">{listing.description}</p>

      <button
        onClick={handleAddToCart}
        className="mt-6 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-105 transition-transform duration-300 text-white font-bold py-3 px-4 rounded-2xl shadow-lg hover:shadow-pink-500/60"
      >
        Book Now
      </button>
    </div>
  );
}

export default ListingDetail;
