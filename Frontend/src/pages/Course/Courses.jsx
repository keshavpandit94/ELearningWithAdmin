import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
import {
  BookOpen,
  Search,
  Filter,
  Grid3X3,
  List,
<<<<<<< HEAD
  Loader2,
  Sparkles
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
} from "lucide-react";
import useEnroll from "../../hooks/useEnroll";
import BACK_URL from "../../api";
import CardComponents from "../../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { enroll, isLoading: enrolling } = useEnroll({ token });

<<<<<<< HEAD
  useEffect(() => {
    setLoading(true);
    axios.get(`${BACK_URL}/api/courses`)
      .then((res) => setCourses(res.data || []))
      .catch(() => alert("Unable to load courses."))
      .finally(() => setLoading(false));

    if (token) {
      axios.get(`${BACK_URL}/api/enrollments/my-courses`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setEnrolledCourses(res.data || []))
        .catch(err => console.error(err));
    }
  }, [token]);

  const getEnrollmentStatus = (courseId) => {
    const record = enrolledCourses.find((ec) => ec.course?._id === courseId);
    return record ? record.status : null;
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Sparkles size={18} />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Discovery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Explore <span className="text-blue-600 italic">Knowledge.</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Showing {filteredCourses.length} world-class programs.
            </p>
          </motion.div>

          {/* Toggle View Mode */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-xl transition-all ${
                viewMode === "grid" ? "bg-white shadow-md text-blue-600" : "text-slate-400"
              }`}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-xl transition-all ${
                viewMode === "list" ? "bg-white shadow-md text-blue-600" : "text-slate-400"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </header>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by course title or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm font-medium"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 rounded-[1.5rem] font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* --- CONTENT AREA --- */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Fetching Catalog</p>
            </motion.div>
          ) : filteredCourses.length > 0 ? (
            <motion.div
              key="grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className={
                viewMode === "grid"
                  ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "flex flex-col gap-6"
              }
            >
              {filteredCourses.map((c) => (
                <motion.div
                  key={c._id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <CardComponents
                    course={c}
                    status={getEnrollmentStatus(c._id)}
                    enrolling={enrolling}
                    enroll={enroll}
                    navigate={() => navigate(`/courses/${c._id}`)}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200"
            >
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search className="text-slate-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No results found</h3>
              <p className="text-slate-500 mt-1">Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
=======
  // Fetch courses and enrollments (if logged in)
  useEffect(() => {
    setLoading(true);
    // Fetch courses (public, no auth required)
    axios
      .get(`${BACK_URL}/api/courses`)
      .then((res) => {
        setCourses(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        alert("Unable to load courses. Please try again.");
      })
      .finally(() => setLoading(false));

    // If logged in, fetch enrolled courses
    if (token) {
      axios
        .get(`${BACK_URL}/api/enrollments/my-courses`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setEnrolledCourses(res.data || []))
        .catch((err) =>
          console.error("Failed to load enrollments:", err)
        );
    } else {
      setEnrolledCourses([]);
    }
  }, [token]);

  // Get enrollment status for each course
  const getEnrollmentStatus = (courseId) => {
    const record = enrolledCourses.find(
      (ec) => ec.course?._id === courseId
    );
    return record ? record.status : null; // enrolled | pending | null
  };

  // Filter courses by search term
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Navigate to course details (no login required)
  const openCourseDetails = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                All Courses
              </h2>
              <p className="text-gray-600 mt-1">
                Discover and enroll in amazing courses
              </p>
            </div>
          </div>
        </div>

        {/* Search + View mode */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-600">Loading courses...</p>
          </div>
        )}

        {/* Courses List */}
        {!loading && filteredCourses.length > 0 && (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-4"
            }
          >
            {filteredCourses.map((c) => {
              const status = getEnrollmentStatus(c._id);

              return (
                <CardComponents
                  key={c._id}
                  course={c}
                  status={status}
                  enrolling={enrolling}
                  enroll={enroll}
                  // Pass a custom navigate function to open details page regardless of login
                  navigate={() => openCourseDetails(c._id)}
                  viewMode={viewMode}
                />
              );
            })}
          </div>
        )}

        {/* No courses matching */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            No courses found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
