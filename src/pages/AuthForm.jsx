import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Navigation ke liye

export default function AuthForm() {
  const navigate = useNavigate(); // 👈 Use navigate for redirection
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // 👈 Store logged-in user
        alert(`Welcome, ${user.name || "User"}!`);
        navigate("/home"); // 👈 Redirect to HomePage
      } else {
        alert("Invalid credentials");
      }
    } else {
      if (users.find(u => u.email === email)) {
        alert("Email already exists!");
        return;
      }
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Sign up successful!");
      setIsLogin(true);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-4">User Authentication</h2>
        <h3 className="text-lg font-semibold text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h3>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span className="text-green-600 cursor-pointer" onClick={() => setIsLogin(false)}>
                Sign Up here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="text-green-600 cursor-pointer" onClick={() => setIsLogin(true)}>
                Login here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
