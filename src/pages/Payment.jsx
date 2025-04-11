import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Payment() {
  const [form, setForm] = useState({
    house: "",
    area: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const location = useLocation();
  const totalAmount = location.state?.total || 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert("Congratulations! Your order has been placed successfully.");

    setForm({
        house: "",
        area: "",
        city: "",
        state: "",
    });
    setPaymentMethod("");

    localStorage.removeItem("cartItems");
    navigate("/");
  };

  return (
    <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow w-full max-w-md space-y-6"
        >
            <h2 className="text-xl font-bold">Enter Delivery Address</h2>

            <div className="space-y-4">
            <input
                type="text"
                name="house"
                placeholder="House Number"
                className="w-full border rounded p-2"
                value={form.house}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="area"
                placeholder="Area Name"
                className="w-full border rounded p-2"
                value={form.area}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full border rounded p-2"
                value={form.city}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="state"
                placeholder="State"
                className="w-full border rounded p-2"
                value={form.state}
                onChange={handleChange}
                required
            />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select payment method</h3>

                {/* Cash on Delivery Option */}
                <div
                    className={`border rounded p-4 flex items-center justify-between cursor-pointer ${
                    paymentMethod === "cod" ? "border-violet-600" : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                >
                    <div>
                        <p className="text-lg font-semibold text-center text-green-700">
                            Total Amount to Pay: ₹{totalAmount.toFixed(2)}
                        </p>
                        <p className="text-lg font-medium">Cash on Delivery</p>
                    </div>
                    <div className="h-5 w-5 border-2 rounded-full flex justify-center items-center">
                    {paymentMethod === "cod" && (
                        <div className="h-2.5 w-2.5 bg-violet-600 rounded-full" />
                    )}
                    </div>
                </div>

                {/* Online Payment Option */}
                <div
                    className={`border rounded p-4 flex items-center justify-between cursor-pointer ${
                    paymentMethod === "online" ? "border-violet-600" : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("online")}
                >
                    <div>
                        <p className="text-lg font-semibold text-center text-green-700">
                            Total Amount to Pay: ₹{totalAmount.toFixed(2)}
                        </p>
                        <p className="text-lg font-medium">Online Payment</p>
                    </div>
                    <div className="h-5 w-5 border-2 rounded-full flex justify-center items-center">
                        {paymentMethod === "online" && (
                        <div className="h-2.5 w-2.5 bg-violet-600 rounded-full" />
                    )}
                    </div>
                </div>
            </div>

            <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
            >
            Save and Continue →
            </button>
        </form>
        </div>
    </div>
  );
}

