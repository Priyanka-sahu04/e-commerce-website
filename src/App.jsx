
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;