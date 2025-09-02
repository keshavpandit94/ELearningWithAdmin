import { Menu } from "lucide-react";

export default function Navbar({ onToggleSidebar, title }) {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-sm flex items-center justify-between px-4 py-3">
      {/* Left: Toggle (only visible on mobile) */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Page Title */}
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      {/* Right: Placeholder for future actions (profile, notifications, etc.) */}
      <div className="flex items-center gap-3">
        {/* Example */}
        <span className="text-sm text-gray-500">Admin</span>
      </div>
    </header>
  );
}
