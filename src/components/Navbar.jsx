import { useState, useRef, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef();

  // Close profile popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "U";

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
        <div className="hidden md:flex items-center space-x-6 relative">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Products</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>

          <a href="/cart" className="text-gray-700 hover:text-blue-600">
            <ShoppingCart size={24} />
          </a>

          {user && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
              >
                {getInitial(user.name)}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md p-3 z-50">
                  <div className="text-gray-800 mb-2">Hi, {user.name}</div>
                  <button
                    onClick={onLogout}
                    className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
            <div className="mt-2 space-y-2">
              <div className="text-gray-600">Hi, {user.name}</div>
              <button
                onClick={onLogout}
                className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

