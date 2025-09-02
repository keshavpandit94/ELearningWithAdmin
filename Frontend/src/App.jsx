import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Courses from "./pages/Course/Courses";
import CourseDetails from "./pages/Course/CourseDetails";
import MyCourses from "./pages/User/MyCourses";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/User/Profile";
import CoursePlayer from "./pages/User/CoursePlayer";
import Footer from "./components/Footer";
import About from "./pages/About";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Define pages for full footer
  const fullFooterPaths = ["/", "/about-us"];

  // Check if current path requires full footer
  const showFullFooter = fullFooterPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/continue/:courseId" element={<CoursePlayer token={token} />} />
          <Route path="/about-us" element={<About />} />

          {/* Protected Routes */}
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Conditional Footer */}
      {showFullFooter ? <Footer isLoggedIn={!!token} /> : (
        <footer className="bg-gray-100 text-center py-4 text-gray-600 text-sm">
          © {new Date().getFullYear()} E-Learning Platform. All Rights Reserved.
        </footer>
      )}

    </>
  );
}

export default AppWrapper;
