import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function CategoryProduct() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${categoryName}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6 capitalize">
          Showing products for: {categoryName.replace("-", " ")}
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
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
