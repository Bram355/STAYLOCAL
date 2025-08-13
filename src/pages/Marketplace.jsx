import React, { useState, useMemo } from "react";
import { furniture, mirrors } from "../data/marketData";

export default function Marketplace() {
  const [tab, setTab] = useState("furniture");
  const [search, setSearch] = useState("");

  const items = useMemo(() => {
    const list = tab === "furniture" ? furniture : mirrors;
    return list.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [tab, search]);

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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white pt-20">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow mb-3">
          Marketplace
        </h1>
        <p className="text-gray-300 text-sm mb-5">
          Switch between <span className="text-yellow-300 font-semibold">Furniture</span> and{" "}
          <span className="text-yellow-300 font-semibold">Mirrors</span>. Search and shop instantly.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-yellow-400 transition"
        />
      </div>

      {/* Category toggle */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="bg-gray-800/50 backdrop-blur rounded-xl p-1 flex">
          <button
            onClick={() => setTab("furniture")}
            className={`flex-1 py-2 rounded-lg font-semibold transition
              ${tab === "furniture" ? "bg-yellow-400 text-black shadow-lg" : "text-gray-300 hover:text-white"}`}
          >
            🛋️ Furniture
          </button>
          <button
            onClick={() => setTab("mirrors")}
            className={`flex-1 py-2 rounded-lg font-semibold transition
              ${tab === "mirrors" ? "bg-yellow-400 text-black shadow-lg" : "text-gray-300 hover:text-white"}`}
          >
            🪞 Mirrors
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {items.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900/80 rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-yellow-500/30"
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
                  <span className="absolute top-3 right-3 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full shadow">
                    ${item.price}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-bold text-yellow-300">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.description}</p>

                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-black font-bold py-2.5 rounded-lg transition shadow-lg hover:shadow-yellow-500/40"
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
