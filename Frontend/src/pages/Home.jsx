import {
  GraduationCap,
  UserPlus,
  LogIn,
  BookOpen,
  Play,
<<<<<<< HEAD
  Users, // <--- Add this
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles, // <--- Add these for the modern UI
  Zap,
  Globe
=======
  Users,
  Clock,
  CheckCircle,
  ArrowRight
>>>>>>> 35975c69493032751758ba9568584d2f16146318
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
import BACK_URL from "../api";
import CardComponents from "../components/CourseCard";
=======
import BACK_URL from "../api";
import CardComponents from "../components/CourseCard";  // <-- import CardComponents
>>>>>>> 35975c69493032751758ba9568584d2f16146318
import InstructorCard from "../components/InstructorCard";

export default function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [user, setUser] = useState(null);

<<<<<<< HEAD
=======
  // Fetch user and courses on mount
>>>>>>> 35975c69493032751758ba9568584d2f16146318
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${BACK_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
<<<<<<< HEAD
      }).then((res) => setUser(res.data.user)).catch(err => console.error(err));
    }
    axios.get(`${BACK_URL}/api/courses`).then((res) => setCourses(res.data));
    axios.get(`${BACK_URL}/api/instructors`).then((res) => setInstructors(res.data || []));
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated Mesh Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-200 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-md mb-8"
          >
            <Sparkles size={16} className="text-blue-500" />
            <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">The Future of Education</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            Learn without <br />
            <span className="text-blue-600 italic">boundaries.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 font-medium"
          >
            A bespoke learning experience tailored for the next generation of creators, developers, and leaders.
          </motion.p>

          {/* Action Buttons with Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/signup")}
                  className="relative group px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold transition-all hover:bg-slate-800 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95"
                >
                  <span className="flex items-center gap-3">
                    Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                >
                  Sign In
                </button>
              </>
            ) : (
              <div className="p-6 bg-white/50 backdrop-blur-xl border border-white rounded-3xl shadow-xl inline-block">
                <p className="text-slate-600">Welcome back, <span className="font-bold text-slate-900">{user.name}</span>! Ready for your next lesson?</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* --- BENTO FEATURES DISPLAY --- */}
        <div className="max-w-7xl mx-auto px-6 mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex flex-col justify-between h-48">
            <Zap className="text-blue-600" size={32} />
            <span className="font-bold text-lg">Fast Track Learning</span>
          </div>
          <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between h-48 md:translate-y-8">
            <Users className="text-indigo-600" size={32} strokeWidth={1.5} />
            <span className="font-bold text-lg">20k+ Community</span>
          </div>
          <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between h-48">
            <Globe className="text-emerald-600" size={32} strokeWidth={1.5} />
            <span className="font-bold text-lg">Global Access</span>
          </div>
          <div className="p-8 bg-slate-900 rounded-[2rem] text-white flex flex-col justify-between h-48 md:translate-y-8">
            <GraduationCap className="text-blue-400" size={32} />
            <span className="font-bold text-lg">Certified Paths</span>
          </div>
        </div>
      </section>

      {/* --- CLEAN COURSE SECTION --- */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Featured Content</h2>
              <p className="text-slate-500 mt-2">Curated courses from industry pioneers.</p>
            </div>
            <button className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
              Browse all 200+ courses <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <motion.div 
                key={course._id}
                whileHover={{ y: -12 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CardComponents course={course} navigate={navigate} viewMode="grid" />
              </motion.div>
=======
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.error("Error fetching user:", err));
    }

    axios.get(`${BACK_URL}/api/courses`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
    
    axios
      .get(`${BACK_URL}/api/instructors`)
      .then((res) =>{
        console.log(res.data)
 setInstructors(res.data || [])
      })
      .catch((err) => console.error("Failed to fetch instructors:", err));
    
    }, []);

  // Navigate to course details
  const CourseDetailsHandler = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

    const goToInstructorDetails = (instructorId) => {
    navigate(`/instructors/${instructorId}`);
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="text-center py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-12 h-12 text-blue-600" />
          </div>

          {user && (
            <h2 className="text-xl text-gray-700 mb-4">
              Welcome back, <span className="font-bold text-blue-600">{user.name}</span> 👋
            </h2>
          )}

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to
            <span className="text-blue-600 block mt-2">E-Learning Platform</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unlock your potential with world-class courses. Learn anything, anytime, from anywhere with expert instructors and interactive content.
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => navigate("/signup")}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
              >
                <UserPlus className="w-5 h-5" />
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-3 px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:text-green-600 transition-all duration-200 font-semibold shadow-md"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Featured Courses */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses designed by industry experts to help you master in-demand skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CardComponents
                key={course._id}
                course={course}
                status={null}         // Assuming no enrolled status on home page
                enrolling={false}     // No loading state here
                navigate={navigate}   // Pass navigate to handle navigation inside Card
                viewMode="grid"       // Use grid mode for Home page cards
              />
>>>>>>> 35975c69493032751758ba9568584d2f16146318
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* --- INSTRUCTORS WITH DEPTH --- */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-20 tracking-tight">Learn from the Best</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {instructors.map((instructor) => (
              <div key={instructor._id} className="grayscale hover:grayscale-0 transition-all duration-500">
                <InstructorCard
                  instructor={instructor}
                  onClick={() => navigate(`/instructors/${instructor._id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      {!user && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-24 text-center text-white shadow-[0_40px_80px_-15px_rgba(37,99,235,0.4)]">
            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to transform?</h2>
            <button
              onClick={() => navigate("/signup")}
              className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:scale-110 transition-transform shadow-2xl"
            >
              Join Free Now
=======
        <section className="bg-gray-50 border-t border-gray-200 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
              Meet Our Instructors
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {instructors.map((instructor) => (
                <InstructorCard
                  key={instructor._id}
                  instructor={instructor}
                  onClick={() => goToInstructorDetails(instructor._id)}
                />
              ))}
            </div>
          </div>
        </section>

      {/* Final Call to Action for Guests */}
      {!user && (
        <section className="py-16 px-6 text-center bg-gradient-to-br from-green-50 to-green-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Join thousands of students already learning with our platform. Start your journey today!
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
            >
              <CheckCircle className="w-5 h-5" />
              Join Now - It's Free!
>>>>>>> 35975c69493032751758ba9568584d2f16146318
            </button>
          </div>
        </section>
      )}
    </div>
<<<<<<< HEAD
  );
}
=======
    </>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
