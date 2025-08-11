import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart initially
  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  };

  useEffect(() => {
    loadCart();

    // Listen for cart updates from other pages
    window.addEventListener("cartUpdated", loadCart);

    // Cleanup
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.nights || 1),
    0
  );

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price} × {item.nights || 1} nights</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          <button
            onClick={() => alert("Proceeding to checkout...")}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-blue-700"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
