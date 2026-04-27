import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Course";
import Enrollments from "./pages/Enrollments";
import Transactions from "./pages/Transactions";
import Students from "./pages/Students";
import AdminInstructorPage from "./pages/Instructor";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 ">
        {/* Sidebar */}
        
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* Main Content */}
        <main
          className={` flex-1 overflow-auto h-screen`}
        >
          {/* Navbar */}
          <Navbar
            onToggleSidebar={() => setSidebarOpen(true)}
            title="Dashboard"
          />

          {/* Routes */}
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/enrollments" element={<Enrollments />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/student" element={<Students />} />
              <Route path="/instructor" element={<AdminInstructorPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
