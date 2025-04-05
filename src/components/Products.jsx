import React, { useEffect, useState } from 'react';

export default function ProductUI() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-48 flex items-center justify-center bg-gray-50">
              <img src={product.image} alt={product.title} className="h-40 object-contain" />
            </div>
            <div className="p-4">
              <h2 className="text-sm font-semibold line-clamp-2 h-10">{product.title}</h2>
              <p className="text-lg font-bold mt-2">₹{(product.price * 20).toFixed(0)}</p>
              <p className="text-sm text-green-600 mt-1">Free Delivery</p>
              <div className="flex items-center justify-between mt-2">
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">⭐ {product.rating.rate}</span>
                <button className="text-gray-500 hover:text-red-500">
                  <i className="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
