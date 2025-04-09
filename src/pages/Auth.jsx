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
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center">
      <div className=" bg-neutral-100 p-9 rounded-xl xl:w-100 lg:w-100 sm:w-100 w-90 shadow-xl shadow-gray-400">
        <h2 className="text-2xl text-neutral-700 font-bold text-center mb-4">User Authentication</h2>
        <h3 className="text-lg text-neutral-800 font-semibold text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h3>

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
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-neutral-800 text-sm mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(false)}>
                Sign Up here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(true)}>
                Login here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
