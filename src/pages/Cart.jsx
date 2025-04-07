import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedItems);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="border p-2 mb-2 rounded shadow">
            <h2 className="font-semibold">{item.title}</h2>
            <img src={item.image} alt={item.title} className="w-32 h-32" />
            <p>₹ {item.price*20}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
