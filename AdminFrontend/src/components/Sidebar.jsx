import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  DollarSign,
<<<<<<< HEAD
  Users,
  UserCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut
=======
  User2,
  X,
  ChevronLeft,
  ChevronRight,
>>>>>>> 35975c69493032751758ba9568584d2f16146318
} from "lucide-react";

export default function Sidebar({ isOpen, onClose, collapsed, setCollapsed }) {
  const links = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/enrollments", label: "Enrollments", icon: GraduationCap },
    { path: "/transactions", label: "Transactions", icon: DollarSign },
<<<<<<< HEAD
    { path: "/student", label: "Students", icon: Users },
    { path: "/instructor", label: "Instructors", icon: UserCircle },
=======
    { path: "/student", label: "Students", icon: User2 },
    { path: "/instructor", label: "Instructor", icon: User2 },
>>>>>>> 35975c69493032751758ba9568584d2f16146318
  ];

  return (
    <>
<<<<<<< HEAD
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
                <span className="text-white font-black text-xl tracking-tighter">ELRN<span className="text-blue-500">.</span></span>
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
        <nav className="flex-1 px-4 space-y-2 mt-4 custom-scrollbar overflow-y-auto">
=======
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-indigo-100 via-white to-blue-50 border-r shadow-lg p-5 z-40
        transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block
        ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold text-indigo-700">Admin Panel</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-red-100 transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Desktop Header with collapse toggle */}
        <div className="hidden lg:flex justify-between items-center mb-6 sticky top-0 z-10">
          {!collapsed && (
            <h2 className="text-xl font-bold text-indigo-700">Admin Panel</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 mt-4">
>>>>>>> 35975c69493032751758ba9568584d2f16146318
          {links.map(({ path, label, icon: Icon }, index) => (
            <NavLink
              key={index}
              to={path}
<<<<<<< HEAD
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group relative
                ${isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"}
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon size={22} className={`${collapsed ? "" : "shrink-0"}`} />
              
              {!collapsed && (
                <span className="text-sm font-bold tracking-tight">{label}</span>
              )}

              {/* Active Indicator (Dot) */}
              {collapsed && (
                <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full opacity-0 group-[.active]:opacity-100 transition-opacity" />
=======
              title={collapsed ? label : ""}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                }`
              }
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  collapsed ? "mx-auto" : ""
                }`}
              />
              {!collapsed && (
                <span className="text-sm font-medium">{label}</span>
>>>>>>> 35975c69493032751758ba9568584d2f16146318
              )}
            </NavLink>
          ))}
        </nav>
<<<<<<< HEAD

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
=======
      </aside>
    </>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
