import { useState, useRef, useEffect } from "react";
import { Home, ShoppingCart, Heart } from "lucide-react";
import Logo from "../assets/logo2.png"; 

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Separate refs for desktop and mobile
  const profileRefDesktop = useRef();
  const profileRefMobile = useRef();

  // Close profile popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (profileRefDesktop.current && profileRefDesktop.current.contains(e.target)) ||
        (profileRefMobile.current && profileRefMobile.current.contains(e.target))
      ) {
        return;
      }
      setShowProfileMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="bg-neutral-700 p-2 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-neutral-100">
          <img src={Logo} className="w-42 h-15"></img>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 relative">
          <a href="/home" className="text-neutral-100 hover:bg-blue-600 p-2 rounded-full">
            <Home size={35} />
          </a>

          <a href="/wishlist" className="text-neutral-100 hover:bg-blue-600 p-2 rounded-full">
            <Heart size={35} />
          </a>

          <a href="/cart" className="text-neutral-100 hover:bg-blue-600 p-2 rounded-full">
            <ShoppingCart size={35} />
          </a>

          {user && (
            <div className="relative" ref={profileRefDesktop}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-11 h-11 text-2xl flex items-center justify-center bg-blue-600 text-neutral-100 font-semibold rounded-full hover:bg-blue-700"
              >
                {getInitial(user.name)}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md p-3 z-50">
                  <div className="text-gray-800 text-center mb-2">{user.name}</div>
                  <button
                    onClick={onLogout}
                    className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <a href="/home" className="text-neutral-100 hover:bg-blue-600 p-2 rounded-full">
            <Home size={30} />
          </a>

          <a href="/wishlist" className="text-neutral-100 hover:bg-blue-600 p-2 rounded-full">
            <Heart size={35} />
          </a>

          <a href="/cart" className="text-neutral-100 hover:bg-blue-600 p-2 rounded-full">
            <ShoppingCart size={30} />
          </a>

          {user && (
            <div className="relative" ref={profileRefMobile}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 text-2xl flex items-center justify-center bg-blue-600 text-neutral-100 font-semibold rounded-full hover:bg-blue-700"
              >
                {getInitial(user.name)}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md p-3 z-50">
                  <div className="text-gray-800 text-center mb-2">{user.name}</div>
                  <button
                    onClick={onLogout}
                    className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
