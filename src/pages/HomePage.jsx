import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Navbar from "../components/Navbar";
import ProductUI from "../components/Products";

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
    <div className="bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />

      {/* 🔥 Carousel Section */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={700}
        className="mt-4"
      >
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1681398745480-151fc6addaaf?w=500&auto=format&fit=crop&q=60"
            alt="Fashion Sale"
            className="object-cover h-[200px] sm:h-[300px] md:h-[400px] w-full rounded-md"
          />
        </div>
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1672883552013-506440b2f11c?w=500&auto=format&fit=crop&q=60"
            alt="Electronics"
            className="object-cover h-[200px] sm:h-[300px] md:h-[400px] w-full rounded-md"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1616627458733-388ab70cba46?auto=format&fit=crop&w=1600&q=80"
            alt="Home Decor"
            className="object-cover h-[200px] sm:h-[300px] md:h-[400px] w-full rounded-md"
          />
        </div>
      </Carousel>

      {/* 🛍️ Category Section */}
      <div className="bg-white py-6 mt-6 rounded-lg shadow-md mx-auto max-w-9xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Shop by Category</h2>

        <div className="flex justify-center overflow-x-auto gap-6 px-2 sm:px-4 md:px-8 scrollbar-hide">
          {[
            { title: "Mobiles", img: "/assets/categories/mobiles.png" },
            { title: "Women's Fashion", img: "/assets/categories/women.png" },
            { title: "Men's Fashion", img: "/assets/categories/men.png" },
            { title: "Kids & Toys", img: "/assets/categories/kids.png" },
            { title: "Festivals of Bharat", img: "/assets/categories/festival.png" },
            { title: "Ethnic Wear", img: "/assets/categories/ethnic.png" },
            { title: "Mobiles", img: "/assets/categories/mobiles.png" },
            { title: "Women's Fashion", img: "/assets/categories/women.png" },
            { title: "Men's Fashion", img: "/assets/categories/men.png" },
            { title: "Kids & Toys", img: "/assets/categories/kids.png" },
          ].map((category, index) => (
            <div key={index} className="flex flex-col items-center min-w-[80px]">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-yellow-200 flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src={category.img}
                  alt={category.title}
                  className="h-full object-contain"
                />
              </div>
              <p className="text-sm sm:text-base mt-2 text-center">{category.title}</p>
            </div>
          ))}
        </div>
      </div>

      <ProductUI />

      
    </div>
  );
}
