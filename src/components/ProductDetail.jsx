// ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = (product) => {
    const item = {
        id: product.id,
        title: product.name,         // ✅ map `name` to `title`
        price: product.price,
        image: product.thumbnail,    // ✅ map `thumbnail` to `image`
    };

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    existingCart.push(product); // Add the new product
    localStorage.setItem("cartItems", JSON.stringify(existingCart)); // Save updated cart
    alert("✅ Product added to cart!");
  }; 
   

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6 max-w-4xl w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-80 object-contain"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-xl font-bold mb-2">{product.title}</h1>
              <p className="text-green-700 font-bold text-lg mb-1">
                ₹{(product.price * 20).toFixed(0)}
              </p>
              <p className="text-sm text-gray-600 mb-3">{product.category}</p>
              <p className="text-gray-800 text-sm">{product.description}</p>
              <div className="mt-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded">
                  ⭐ {product.rating.rate} / 5
                </span>
              </div>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
