import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id, source) => {
    const updatedWishlist = wishlist.filter(
      (item) => !(item.id === id && item.source === source)
    );
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  if (wishlist.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-gray-600 text-xl">💔 Your wishlist is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12">
        <h1 className="text-3xl font-bold mb-6 text-center">❤️ Your Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={`${item.id}-${item.source}`}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-60 object-contain mb-4 rounded"
              />
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-blue-600 font-bold mb-2">₹{(item.price * 10).toFixed(0)}</p>
              <div className="flex justify-between items-center mt-auto">
                <Link
                  to={`/product/${item.id}?source=${item.source}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Product
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.id, item.source)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
