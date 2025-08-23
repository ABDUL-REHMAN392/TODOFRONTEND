import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError({ username: false, email: false, password: false });

    if (!username || !email || !password) {
      setError("Please fill all fields");
      setFieldError({
        username: !username,
        email: !email,
        password: !password,
      });
      return;
    }

    try {
      const result = await signup(username, email, password);

      if (result.success) {
        toast.success(result.message || "Account created successfully!");
        setError("");
        setTimeout(() => navigate("/todos"), 2000);
      } else {
        setError(result.message || "Signup failed");

        if (result.message.toLowerCase().includes("email"))
          setFieldError((prev) => ({ ...prev, email: true }));
        if (result.message.toLowerCase().includes("username"))
          setFieldError((prev) => ({ ...prev, username: true }));

        toast.error(result.message || "Signup failed");
      }
    } catch {
      setError("Something went wrong. Try again!");
      toast.error("Something went wrong. Try again!");
    } finally {
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white/20 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">
          Create an account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
              setFieldError((prev) => ({ ...prev, username: false }));
            }}
            className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              fieldError.username ? "border-red-500" : "border-gray-300"
            }`}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setFieldError((prev) => ({ ...prev, email: false }));
            }}
            className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              fieldError.email ? "border-red-500" : "border-gray-300"
            }`}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
                setFieldError((prev) => ({ ...prev, password: false }));
              }}
              className={`px-4 py-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                fieldError.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-900 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
