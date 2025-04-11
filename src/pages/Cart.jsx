import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemsWithQuantity = savedItems.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(itemsWithQuantity);
  }, []);

  const handleRemove = (indexToRemove) => {
    const updatedItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (index, delta) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = Math.max(1, updatedItems[index].quantity + delta);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * 20 * item.quantity, 0);
  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center my-6">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">No items in cart.</p>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              {/* Header */}
              <div className="hidden sm:grid grid-cols-5 font-semibold text-gray-700 border-b pb-3 text-sm md:text-base">
                <span className="col-span-2">Product</span>
                <span className="text-center">Delivery</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">Total</span>
              </div>

              {/* Items */}
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="grid sm:grid-cols-5 grid-cols-1 border-b py-4 gap-4 text-sm md:text-base"
                >
                  {/* Product Section */}
                  <div className="sm:col-span-2 flex sm:flex-row flex-col sm:items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded mx-auto sm:mx-0"
                    />
                    <div className="text-center sm:text-left">
                      <h2 className="text-lg">{item.title}</h2>
                      <p className="text-gray-600 ">{item.category}</p>
                      <p className="text-violet-600 font-semibold">
                        ₹{(item.price * 20).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Delivery */}
                  <p className="flex justify-center items-center text-lg text-gray-700">Free Delivery</p>

                  {/* Quantity */}
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      ＋
                    </button>
                  </div>

                  {/* Total + Remove */}
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-violet-600 text-lg font-semibold">
                      ₹{(item.price * 20 * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-500 text-lg mt-1 hover:underline"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Summary Section */}
              <div className="text-right mt-6 space-y-2 text-sm md:text-base">
                <div className="flex justify-between sm:justify-end items-center text-lg font-semibold gap-10 text-gray-700">
                  <span>Sub Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between sm:justify-end items-center text-lg font-semibold gap-10 text-gray-700">
                  <span>Delivery Charge</span>
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between sm:justify-end items-center gap-10 font-bold text-2xl text-violet-600">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Button */}
              <div className="mt-6 flex justify-center sm:justify-end">
                <button
                  className="bg-violet-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-violet-700 transition"
                  onClick={() => navigate("/payment", { state: { total } })}
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

