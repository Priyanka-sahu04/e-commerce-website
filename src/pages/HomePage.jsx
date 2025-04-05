import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Navbar from "../components/Navbar";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
      <div>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        {user ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
                      
          </>
        ) : (
          <p>Loading...</p>
        )}
        </div>
      </div>
  );
}
