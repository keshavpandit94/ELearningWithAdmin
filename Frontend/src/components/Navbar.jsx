import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Library,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  Home,
  User,
  Info,
  ChevronDown,
  Sparkles
} from "lucide-react";
import BACK_URL from "../api";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const profileRef = useRef(null);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (token) {
      axios.get(`${BACK_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, [token]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  const linkClass = (path) => `
    relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300
    ${location.pathname === path 
      ? "text-blue-600 bg-blue-50/50" 
      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"}
  `;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-8 py-4 ${
      scrolled ? "top-2" : "top-0"
    }`}>
      <div className={`max-w-7xl mx-auto rounded-[2rem] transition-all duration-500 ${
        scrolled 
        ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20" 
        : "bg-white border-transparent shadow-none"
      }`}>
        <div className="px-6 md:px-8 flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200"
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </motion.div>
            <span className="font-black text-xl tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">
              ELRN<span className="text-blue-600">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/courses" className={linkClass("/courses")}>Courses</Link>
            <Link to="/my-courses" className={linkClass("/my-courses")}>My Learning</Link>
            <Link to="/about-us" className={linkClass("/about-us")}>About</Link>
          </div>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-4">
            {!token ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-blue-600">
                  Log in
                </Link>
                <Link to="/signup" className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95">
                  <UserPlus size={16} /> Join Free
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md">
                    <User size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Student</p>
                    <p className="text-sm font-bold text-slate-800">{user?.name?.split(' ')[0] || "Profile"}</p>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-3 z-50"
                    >
                      <div className="p-4 mb-2 bg-slate-50 rounded-2xl">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Signed in as</p>
                        <p className="text-sm font-black text-slate-900 truncate">{user?.email}</p>
                      </div>
                      <Link to="/profile" className={linkClass("/profile")} onClick={() => setIsProfileOpen(false)}>
                        <User size={16} /> Profile Settings
                      </Link>
                      <Link to="/my-courses" className={linkClass("/my-courses")} onClick={() => setIsProfileOpen(false)}>
                        <Sparkles size={16} className="text-amber-500" /> My Progress
                      </Link>
                      <div className="h-px bg-slate-100 my-2 mx-2" />
                      <button onClick={logout} className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl w-full font-bold text-sm transition-colors">
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white rounded-b-[2rem] border-t border-slate-50 overflow-hidden"
            >
              <div className="p-6 space-y-2">
                <Link to="/" className={linkClass("/")} onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/courses" className={linkClass("/courses")} onClick={() => setIsMenuOpen(false)}>Courses</Link>
                {!token ? (
                   <Link to="/signup" className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold mt-4">
                     Get Started
                   </Link>
                ) : (
                  <button onClick={logout} className="w-full py-4 text-red-500 font-bold border border-red-100 rounded-2xl mt-4">
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}