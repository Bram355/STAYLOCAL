import React, { useState, useMemo } from "react";
import { furniture as furnitureData, mirrors as mirrorsData } from "../data/marketData";

export default function Marketplace() {
  const [furniture] = useState(furnitureData);
  const [mirrors] = useState(mirrorsData);

  const [tab, setTab] = useState("furniture");
  const [search, setSearch] = useState("");

  const items = useMemo(() => {
    const list = tab === "furniture" ? furniture : mirrors;
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [tab, search, furniture, mirrors]);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      type: tab,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${item.title} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          🛒 Marketplace
        </h1>
        <p className="text-gray-300 text-sm mb-8">
          Browse our{" "}
          <span className="text-yellow-300 font-semibold">Furniture</span> and{" "}
          <span className="text-yellow-300 font-semibold">Mirrors</span>.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto px-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-800/80 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-yellow-400 transition shadow-md"
        />
      </div>

      {/* Category toggle */}
      <div className="max-w-md mx-auto px-4 mb-10">
        <div className="bg-gray-800/70 backdrop-blur rounded-2xl p-1 flex shadow-md">
          <button
            onClick={() => setTab("furniture")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300
              ${tab === "furniture" ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-black shadow-lg" : "text-gray-300 hover:text-white"}`}
          >
            🛋️ Furniture
          </button>
          <button
            onClick={() => setTab("mirrors")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300
              ${tab === "mirrors" ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-black shadow-lg" : "text-gray-300 hover:text-white"}`}
          >
            🪞 Mirrors
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {items.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900/80 rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-yellow-500/40 border border-gray-800"
              >
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover transform transition duration-500 group-hover:scale-105"
                  />
                  {tab === "mirrors" && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 mix-blend-screen" />
                  )}
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow">
                    ${item.price}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-yellow-300">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.description}</p>

                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-pink-500 hover:scale-105 active:scale-95 text-black font-bold py-2.5 rounded-lg transition transform shadow-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
