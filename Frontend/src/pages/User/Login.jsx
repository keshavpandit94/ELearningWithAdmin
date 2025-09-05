import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import BACK_URL from "../../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" }); // unified message
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    axios
      .post(`${BACK_URL}/api/auth/login`, form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setMsg({ type: "success", text: "Login successful! Redirecting..." });
        setTimeout(() => navigate("/"), 1200);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status === 403 &&
          err.response.data?.message?.toLowerCase().includes("suspend")
        ) {
          setMsg({ type: "error", text: err.response.data.message });
        } else {
          setMsg({
            type: "error",
            text: err.response?.data?.message || "Login failed. Try again.",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        {/* Logo + Heading */}
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
          <p className="text-gray-500 mt-1">Welcome back! Please login</p>
        </div>

        {/* Message Block */}
        {msg.text && (
          <div
            className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
              msg.type === "error"
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-green-50 text-green-600 border border-green-200"
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            {msg.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              autoFocus
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02]"
              }`}
          >
            {loading ? (
              <span className="animate-pulse">Logging in...</span>
            ) : (
              <>
                <LogIn size={18} /> Login
              </>
            )}
          </button>
        </form>

        {/* Signup Redirect */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
