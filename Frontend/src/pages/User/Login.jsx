import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, Sparkles, ArrowRight } from "lucide-react";
=======
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, Sparkles, ArrowRight } from "lucide-react";
=======
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
import BACK_URL from "../../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [msg, setMsg] = useState({ type: "", text: "" });
=======
<<<<<<< HEAD
  const [msg, setMsg] = useState({ type: "", text: "" });
=======
  const [msg, setMsg] = useState({ type: "", text: "" }); // unified message
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        setMsg({ type: "success", text: "Welcome back! Redirecting..." });
        setTimeout(() => navigate("/"), 1200);
      })
      .catch((err) => {
<<<<<<< HEAD
        // Preserved Suspension Check logic from older version
=======
        const errorMsg = err.response?.data?.message || "Login failed. Try again.";
        setMsg({ type: "error", text: errorMsg });
=======
        setMsg({ type: "success", text: "Login successful! Redirecting..." });
        setTimeout(() => navigate("/"), 1200);
      })
      .catch((err) => {
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        if (
          err.response &&
          err.response.status === 403 &&
          err.response.data?.message?.toLowerCase().includes("suspend")
        ) {
          setMsg({ type: "error", text: err.response.data.message });
        } else {
<<<<<<< HEAD
          const errorMsg = err.response?.data?.message || "Login failed. Try again.";
          setMsg({ type: "error", text: errorMsg });
        }
=======
          setMsg({
            type: "error",
            text: err.response?.data?.message || "Login failed. Try again.",
          });
        }
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      })
      .finally(() => setLoading(false));
  };

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    <div className="flex justify-center items-center min-h-screen bg-[#fafafa] px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60" />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 w-full max-w-md border border-white relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200"
          >
            <LogIn className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Welcome Back</h2>
          <p className="text-slate-500 font-medium mt-2">Enter your credentials to continue</p>
        </div>

        {/* Feedback Message */}
        <AnimatePresence mode="wait">
          {msg.text && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold ${
                msg.type === "error"
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
              }`}
            >
              <AlertCircle size={18} />
              {msg.text}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                autoFocus
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900"
                type="email"
                name="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
               <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
               <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">Forgot?</span>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-3 mt-4
              ${loading 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-slate-900 hover:bg-blue-600 shadow-slate-200"
              }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              <>
                Login to Dashboard <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm font-medium">
            New to the platform?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:text-blue-700 font-black hover:underline underline-offset-4"
            >
              Create an account
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
