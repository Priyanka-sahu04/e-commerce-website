import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function SearchProduct() {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${keyword}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Search error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6 capitalize">
          Search results for: {decodeURIComponent(keyword)}
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-red-500">No matching products found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}?source=dummyjson`}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition block"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {product.description.slice(0, 60)}...
                </p>
                <p className="mt-2 font-bold text-indigo-600">
                  ₹{Math.round(product.price * 10)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
