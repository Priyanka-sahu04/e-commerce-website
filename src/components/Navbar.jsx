import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">MyShop</div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Products</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>

          <a href="#" className="text-gray-700 hover:text-blue-600">
            <ShoppingCart size={24} />
          </a>

          {user && (
            <>
              <span className="text-gray-600">Hi, {user.name}</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">
            <ShoppingCart size={24} />
          </a>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Products</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">About</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Contact</a>

          {user && (
            <>
              <div className="text-gray-600">Hi, {user.name}</div>
              <button
                onClick={onLogout}
                className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
