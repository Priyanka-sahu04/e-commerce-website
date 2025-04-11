import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Navbar from "../components/Navbar";
import ProductUI from "../components/Products";
import Footer from "../components/Footer"
import Electronics from "../assets/electronics.png";
import MenF from "../assets/men's.png"
import WomenF from "../assets/women's.png"
import Banner1 from "../assets/banner1.png"
import Banner2 from "../assets/banner2.png"
import Banner3 from "../assets/banner3.png"
import CategorySearch from "../components/CategorySearch"

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

  const categories = [
    { title: "Smartphones", img: Electronics, apiCategory: "smartphones" },
    { title: "Fragrances", img: Electronics, apiCategory: "fragrances" },
    { title: "Groceries", img: Electronics, apiCategory: "groceries" },
    { title: "Home Decoration", img: Electronics, apiCategory: "home-decoration" },
    { title: "Women's Dresses", img: WomenF, apiCategory: "womens-dresses" },
    { title: "Women's Shoes", img: Electronics, apiCategory: "womens-shoes" },
    { title: "Men's Shirts", img: MenF, apiCategory: "mens-shirts" },
    { title: "Men's Shoes", img: Electronics, apiCategory: "mens-shoes" },
    { title: "Men's Watches", img: Electronics, apiCategory: "mens-watches" },
    { title: "Women's Watches", img: MenF, apiCategory: "womens-watches" },
  ];

  return (
    <div className="bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      <CategorySearch />

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
            src= {Banner1}
            alt="Fashion Sale"
            className="object-cover h-auto w-full"
          />
        </div>
        <div>
          <img
            src= {Banner2}
            alt="Electronics"
            className="object-cover h-auto w-full"
          />
        </div>
        <div>
          <img
            src= {Banner3}
            alt="Home Decor"
            className="object-cover h-auto w-full"
          />
        </div>
      </Carousel>

      {/* 🛍️ Category Section */}
      <div className="bg-white py-6 mt-6 rounded-lg shadow-md mx-auto max-w-8xl">
  <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
    Shop by Category
  </h2>

  <div
    className="
      flex 
      gap-6 
      px-4 
      snap-x snap-mandatory scroll-smooth 
      overflow-x-auto 
      md:overflow-x-auto 
      lg:overflow-x-hidden 
      lg:justify-center 
      scrollbar-hide md:scrollbar-thin md:scrollbar-thumb-gray-400 md:scrollbar-track-gray-100
    "
  >
    {categories.map((category, index) => (
      <Link
        to={`/category/${category.apiCategory}`}
        key={index}
        className={`snap-start ${
          index === 0 ? "ml-2" : index === categories.length - 1 ? "mr-2" : ""
        }`}
      >
        <div className="flex flex-col items-center min-w-[90px] sm:min-w-[100px] md:min-w-[110px]">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <img
              src={category.img}
              alt={category.title}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-sm sm:text-base mt-2 text-center">{category.title}</p>
        </div>
      </Link>
    ))}
  </div>
</div>


      <ProductUI />

      <Footer />
    </div>
  );
}