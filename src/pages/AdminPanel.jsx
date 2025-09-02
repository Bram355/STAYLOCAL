import React, { useState } from "react";
import listingsData from "../data/listingsData";
import { furniture as furnitureData, mirrors as mirrorsData } from "../data/marketData";

export default function AdminPanel({ isAdmin }) {
  // State for all three datasets
  const [listings, setListings] = useState(Array.isArray(listingsData) ? listingsData : []);
  const [furniture, setFurniture] = useState(furnitureData);
  const [mirrors, setMirrors] = useState(mirrorsData);

  const [newItem, setNewItem] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    price: "",
    category: "listings", // listings, furniture, mirrors
  });

  if (!isAdmin) {
    return (
      <div className="p-6 text-center text-red-400 font-semibold text-xl">
        ❌ You do not have permission to manage content.
      </div>
    );
  }

  // Add new item
  const handleAdd = () => {
    if (!newItem.title || !newItem.image || !newItem.price) {
      alert("Please fill all fields!");
      return;
    }
    const item = { ...newItem, id: Date.now().toString(), price: Number(newItem.price) };

    if (newItem.category === "listings") {
      setListings([...listings, item]);
    } else if (newItem.category === "furniture") {
      setFurniture([...furniture, item]);
    } else {
      setMirrors([...mirrors, item]);
    }

    setNewItem({
      id: "",
      title: "",
      description: "",
      image: "",
      price: "",
      category: "listings",
    });
  };

  // Delete item
  const handleDelete = (id, category) => {
    if (category === "listings") {
      setListings(listings.filter((i) => i.id !== id));
    } else if (category === "furniture") {
      setFurniture(furniture.filter((i) => i.id !== id));
    } else {
      setMirrors(mirrors.filter((i) => i.id !== id));
    }
  };

  // Update price
  const handleUpdatePrice = (id, newPrice, category) => {
    if (category === "listings") {
      setListings(listings.map((i) => (i.id === id ? { ...i, price: newPrice } : i)));
    } else if (category === "furniture") {
      setFurniture(furniture.map((i) => (i.id === id ? { ...i, price: newPrice } : i)));
    } else {
      setMirrors(mirrors.map((i) => (i.id === id ? { ...i, price: newPrice } : i)));
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-black to-gray-950 min-h-screen text-white">
      <h2 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
        🛠 Admin Panel
      </h2>

      {/* Add New Item */}
      <div className="mb-12 bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-white/10">
        <h3 className="text-2xl font-semibold mb-5 text-yellow-400">➕ Add New Item</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-400 outline-none"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
        </div>
        <input
          type="text"
          placeholder="Description"
          className="w-full mt-3 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full mt-3 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-400 outline-none"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
        />
        <select
          className="w-full mt-3 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          <option value="listings">🏠 Listings</option>
          <option value="furniture">🛋 Furniture</option>
          <option value="mirrors">🪞 Mirrors</option>
        </select>
        <button
          onClick={handleAdd}
          className="mt-5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-3 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all"
        >
          🚀 Add Item
        </button>
      </div>

      {/* Section Renderer */}
      {[
        { title: "🏠 Stays / Listings", data: listings, category: "listings" },
        { title: "🛋 Furniture", data: furniture, category: "furniture" },
        { title: "🪞 Mirrors", data: mirrors, category: "mirrors" },
      ].map((section) => (
        <div key={section.category} className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center text-pink-400">
            {section.title}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.data.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:border-pink-400/50 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => handleDelete(item.id, section.category)}
                    className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 px-3 py-1 rounded-lg shadow-md hover:scale-110 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                  <p className="mt-2 font-semibold text-yellow-400 text-lg">
                    ${item.price}
                  </p>
                  <input
                    type="number"
                    placeholder="Update Price"
                    onChange={(e) =>
                      handleUpdatePrice(item.id, Number(e.target.value), section.category)
                    }
                    className="w-full mt-3 px-2 py-1 rounded bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
