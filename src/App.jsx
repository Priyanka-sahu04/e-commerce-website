
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./pages/Auth";
import HomePage from "./pages/HomePage";
import ProductDetail from "./components/ProductDetail";
import Cart from "./pages/Cart";
import CategoryProduct from "./pages/CategoryProducts";
import Payment from "./pages/Payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<CategoryProduct />} />
        <Route path="/payment" element={<Payment />} /> 
      </Routes>
    </Router>
  );
}

export default App;