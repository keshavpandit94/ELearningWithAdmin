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
  ];

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-lg p-5 z-40
        transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block
        ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Desktop Header with collapse toggle */}
        <div className="hidden lg:flex justify-between items-center mb-6 sticky top-0 z-10">
          {!collapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-100"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-3 mt-4">
          {links.map(({ path, label, icon: Icon }, index) => (
            <NavLink
              key={index}
              to={path}
              title={collapsed ? label : ""}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
