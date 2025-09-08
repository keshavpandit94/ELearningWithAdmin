import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  DollarSign,
  User2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose, collapsed, setCollapsed }) {
  const links = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/enrollments", label: "Enrollments", icon: GraduationCap },
    { path: "/transactions", label: "Transactions", icon: DollarSign },
    { path: "/student", label: "Students", icon: User2 },
    { path: "/instructor", label: "Instructor", icon: User2 },
  ];

  return (
    <>
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
          {links.map(({ path, label, icon: Icon }, index) => (
            <NavLink
              key={index}
              to={path}
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
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
