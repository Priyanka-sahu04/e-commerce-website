import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategorySearch = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!category) {
      setError("Please select a category.");
      return;
    }
    setError("");
    navigate(`/category/${encodeURIComponent(category)}`); // ✅ Safe encode
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        >
          <option value="">-- Select a Category --</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home Decoration</option>
          <option value="furniture">Furniture</option>
        </select>

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
        >
          Search
        </button>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default CategorySearch;
