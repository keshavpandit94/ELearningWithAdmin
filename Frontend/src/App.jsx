import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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

  // 1. Specialized logic for the Course Player (Focus Mode)
  // We hide Navbar and Footer to give the video player 100% screen real estate.
  const isPlayerPage = location.pathname.startsWith("/continue/");

  // 2. Footer configuration
  const fullFooterPaths = ["/", "/about-us"];
  const showFullFooter = fullFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      {/* 3. Conditionally Render Navbar */}
      {!isPlayerPage && <Navbar />}

      {/* 4. Main Content Area 
          pt-0 for player to stick to top, pt-20 for others to clear fixed navbar
      */}
      <main className={`flex-grow ${isPlayerPage ? "pt-0" : "pt-20 md:pt-24"}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
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
        </AnimatePresence>
      </main>

      {/* 5. Conditionally Render Footer */}
      {!isPlayerPage && (
        showFullFooter ? (
          <Footer isLoggedIn={!!token} />
        ) : (
          <footer className="bg-white border-t border-slate-100 py-8 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} ELRN Platform • Built for the Future
            </p>
          </footer>
        )
      )}
    </div>
  );
}

export default AppWrapper;