import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Navigation ke liye

export default function AuthForm() {
  const navigate = useNavigate(); // 👈 Use navigate for redirection
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 👇 Redirect to /home if already logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      navigate("/home");
    }
  }, [navigate]);

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
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row bg-white p-6 lg:p-10 rounded-2xl shadow-xl shadow-gray-400 w-full max-w-6xl">

        {/* Image on Top for Small Screens */}
        <div className="block lg:hidden mb-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/100/322/non_2x/account-login-and-password-data-protection-cyber-security-online-registration-confidentiality-concept-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg"
            alt="Login Illustration"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        {/* Left Image Section for Large Screens */}
        <div className="hidden lg:block w-1/2 pr-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/100/322/non_2x/account-login-and-password-data-protection-cyber-security-online-registration-confidentiality-concept-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl text-neutral-700 font-bold text-center mb-5">User Authentication</h2>
          <h3 className="text-xl text-neutral-800 font-semibold text-center mb-5">{isLogin ? "Login" : "Sign Up"}</h3>

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <input
                type="text"
                className="w-full border px-4 py-3 rounded text-base"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              className="w-full border px-4 py-3 rounded text-base"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full border px-4 py-3 rounded text-base"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded text-base">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-neutral-800 text-sm mt-5">
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
    </div>
  );
}
