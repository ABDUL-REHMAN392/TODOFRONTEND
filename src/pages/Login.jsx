import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setFieldError((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFieldError = {
      email: !formData.email,
      password: !formData.password,
    };
    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      setFieldError(newFieldError);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setError("");
        toast.success(result.message || "Logged in successfully!", {
          onClose: () => navigate("/todos"),
          autoClose: 2000,
        });
      } else {
        setError(result.message || "Invalid credentials");
        toast.error(result.message || "Invalid credentials");

        if (result.message.toLowerCase().includes("email"))
          setFieldError((prev) => ({ ...prev, email: true }));
        if (result.message.toLowerCase().includes("password"))
          setFieldError((prev) => ({ ...prev, password: true }));
      }
    } catch {
      setError("Something went wrong. Try again!");
      toast.error("Something went wrong. Try again!");
    } finally {
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white/20 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">
          Login to TodoPro
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              fieldError.email ? "border-red-500" : "border-gray-300"
            }`}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-900 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
