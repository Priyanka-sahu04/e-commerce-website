import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source") || "fakestore";

  useEffect(() => {
    const apiUrl =
      source === "dummyjson"
        ? `https://dummyjson.com/products/${id}`
        : `https://fakestoreapi.com/products/${id}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // Normalize data structure
        const normalizedData = {
          id: data.id,
          title: data.title,
          price: data.price,
          description: data.description,
          category: data.category,
          image:
            data.image || data.thumbnail || data.images?.[0] || "",
          rating: {
            rate: data.rating?.rate || data.rating || 4.2,
          },
        };
        setProduct(normalizedData);
      });
  }, [id, source]);

  // ✅ Updated function to increase quantity instead of duplicating product
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === product.id && item.source === source
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      const item = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        source,
        quantity: 1,
      };
      existingCart.push(item);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    alert("✅ Product added to cart!");
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6 w-full max-w-6xl">
          {/* Product Image */}
          <div className="flex-1">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[450px] object-contain rounded-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
              <div className="flex items-center mb-3">
                <p className="text-red-600 text-xl font-semibold mr-3">
                  ₹{(product.price * 20).toFixed(0)}
                </p>
                <p className="line-through text-gray-400">
                  ₹{(product.price * 25).toFixed(0)}
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-4 capitalize">
                Category: {product.category}
              </p>
              <p className="text-gray-700 mb-4 text-sm">{product.description}</p>
              <span className="inline-block bg-green-600 text-white text-sm px-3 py-1 rounded mb-4">
                ⭐ {product.rating?.rate} / 5
              </span>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className="bg-red-600 hover:bg-red-700 transition text-white py-3 mt-4 rounded text-center text-lg font-medium"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
