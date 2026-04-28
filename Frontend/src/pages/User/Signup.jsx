import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  UserCheck,
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Sparkles
} from "lucide-react";
import BACK_URL from "../../api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    axios.post(`${BACK_URL}/api/auth/signup`, form)
      .then(() => {
        setMsg({ type: "success", text: "Account created! Redirecting to login..." });
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch((err) => {
        setMsg({
          type: "error",
          text: err.response?.data?.message || "Signup failed. Try again.",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fafafa] px-4 py-20 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-blue-100 rounded-full blur-[100px] opacity-50" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] bg-indigo-100 rounded-full blur-[100px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-10 w-full max-w-lg border border-white relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200"
          >
            <UserCheck className="w-7 h-7 text-white" />
          </motion.div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Join the Academy</h2>
          <p className="text-slate-500 font-medium mt-1">Start your learning journey today</p>
        </div>

        {/* Message Banner */}
        <AnimatePresence mode="wait">
          {msg.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                autoFocus
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Default Account Type</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-2xl text-blue-700">
              <GraduationCap size={20} />
              <span className="text-sm font-bold tracking-tight">Student Account</span>
              <Sparkles size={16} className="ml-auto opacity-50" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`md:col-span-2 w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-3 mt-4
              ${loading 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-slate-900 hover:bg-blue-600 shadow-slate-200"
              }`}
          >
            {loading ? "Initializing..." : (
              <>
                Create Account <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Already a member?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-700 font-black hover:underline underline-offset-4"
            >
              Sign in here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}