import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedItems);
  }, []);

  // Remove item from cart
  const handleRemove = (indexToRemove) => {
    const updatedItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="border p-4 mb-4 rounded shadow flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded" />
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-gray-700">₹ {item.price * 20}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                🗑️ Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
