// import React, { useState } from "react";

// const CategorySearch = () => {
//   const [category, setCategory] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     if (!category.trim()) {
//       setError("Please enter a category.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setProducts([]);

//     try {
//       const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
//       if (!res.ok) throw new Error("Failed to fetch data.");
//       const data = await res.json();
//       setProducts(data);
//     } catch (err) {
//       setError("Failed to fetch products. Try another category.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
//       <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="e.g. electronics, jewelery, men's clothing"
//           className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//         />
//         <button
//           onClick={handleSearch}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
//         >
//           Search
//         </button>
//       </div>

//       {loading && <p className="text-center text-blue-600 font-medium">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="border rounded-lg shadow-md p-4 flex flex-col items-center">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="h-40 w-full object-contain mb-2"
//             />
//             <h3 className="font-semibold text-center text-sm md:text-base">{product.title}</h3>
//             <p className="text-gray-600 mt-1 text-sm">₹ {product.price * 20}</p>
//           </div>
//         ))}
//       </div>

//       {!loading && !error && products.length === 0 && category.trim() !== "" && (
//         <p className="text-center mt-4 text-gray-600">
//           No products found for "<span className="font-medium">{category}</span>"
//         </p>
//       )}
//     </div>
//   );
// };

// export default CategorySearch;







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // 👈 Import karo

// const CategorySearch = () => {
//   const [category, setCategory] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate(); // 👈 Hook for navigation

//   const handleSearch = () => {
//     if (!category.trim()) {
//       setError("Please enter a category.");
//       return;
//     }
//     setError("");
//     // 👇 Navigate to new page
//     navigate(`/category/${category.trim().toLowerCase()}`);
//   };

//   return (
//     <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
//       <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="e.g. electronics, jewelery, men's clothing"
//           className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//         />
//         <button
//           onClick={handleSearch}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
//         >
//           Search
//         </button>
//       </div>

//       {error && <p className="text-center text-red-500">{error}</p>}
//     </div>
//   );
// };

// export default CategorySearch;












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
