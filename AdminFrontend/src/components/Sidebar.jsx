import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  DollarSign,
  Users,
  UserCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut
} from "lucide-react";

export default function Sidebar({ isOpen, onClose, collapsed, setCollapsed }) {
  const links = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/enrollments", label: "Enrollments", icon: GraduationCap },
    { path: "/transactions", label: "Transactions", icon: DollarSign },
    { path: "/student", label: "Students", icon: Users },
    { path: "/instructor", label: "Instructors", icon: UserCircle },
  ];

  return (
    <>
      {/* --- Mobile Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[50] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- Sidebar Container --- */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 z-[60] 
        transition-all duration-500 ease-in-out flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static 
        ${collapsed ? "lg:w-24" : "lg:w-72"}`}
      >
        {/* --- Header Section --- */}
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-3"
              >
                <div className="bg-blue-600 p-2 rounded-xl">
                  <Sparkles size={20} className="text-white" />
                </div>
                <span className="text-white font-black text-xl tracking-tighter">
                  ELRN<span className="text-blue-500">.</span>
                </span>
              </motion.div>
            ) : (
              <motion.div 
                key="mini-logo"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mx-auto bg-blue-600 p-2 rounded-xl"
              >
                <Sparkles size={20} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* --- Navigation Links --- */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          {links.map(({ path, label, icon: Icon }, index) => (
            <NavLink
              key={index}
              to={path}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group relative
                ${isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 active" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"}
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon size={22} className={`${collapsed ? "" : "shrink-0"}`} />
              
              {!collapsed && (
                <span className="text-sm font-bold tracking-tight">{label}</span>
              )}

              {/* Active Indicator (Dot/Line) for collapsed mode */}
              {collapsed && (
                <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full opacity-0 group-[.active]:opacity-100 transition-opacity" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* --- Footer / Collapse Toggle --- */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center gap-3 p-3 rounded-2xl bg-slate-800/50 text-slate-400 hover:text-white transition-all mb-4"
          >
            {collapsed ? <ChevronRight size={20} className="mx-auto" /> : (
              <>
                <ChevronLeft size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Collapse Sidebar</span>
              </>
            )}
          </button>

          <button className={`flex items-center gap-4 p-3.5 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all w-full ${collapsed ? "justify-center" : ""}`}>
            <LogOut size={20} />
            {!collapsed && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}