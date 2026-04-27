import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, GraduationCap, Users, Loader2, Search, 
  Grid3X3, List, Sparkles, Trophy, Target 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BACK_URL from "../../api";
import CourseEnrolledcard from "../../components/CourseEnrolledCard";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [progresses, setProgresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`${BACK_URL}/api/enrollments/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (res) => {
        const enrolled = (res.data || []).filter((item) => item.status === "enrolled");
        setEnrollments(enrolled);

        const progressPromises = enrolled.map((item) =>
          axios.get(`${BACK_URL}/api/progress/${item.course._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((progRes) => ({
              courseId: item.course._id,
              progress: computeCourseProgress(progRes.data.videos),
            }))
            .catch(() => ({ courseId: item.course._id, progress: 0 }))
        );
        const results = await Promise.all(progressPromises);
        const progMap = {};
        results.forEach((r) => (progMap[r.courseId] = r.progress));
        setProgresses(progMap);
      })
      .catch(() => setError("Failed to load your learning dashboard."))
      .finally(() => setLoading(false));
  }, [token]);

  function computeCourseProgress(videos = []) {
    if (!videos || videos.length === 0) return 0;
    const completed = videos.filter((v) => v.completed).length;
    return Math.round((completed / videos.length) * 100);
  }

  const filteredEnrollments = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return enrollments;
    return enrollments.filter(
      (item) =>
        item.course.title.toLowerCase().includes(search) ||
        item.course.instructor?.name?.toLowerCase().includes(search)
    );
  }, [enrollments, searchTerm]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Your Progress</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-blue-600 mb-2 font-black uppercase tracking-widest text-[10px]">
              <Sparkles size={14} />
              <span>Learning Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              My <span className="text-blue-600 italic">Courses.</span>
            </h1>
          </motion.div>

          <div className="flex items-center bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
             <button onClick={() => setViewMode("grid")} className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-white shadow-md text-blue-600" : "text-slate-400"}`}>
               <Grid3X3 size={20} />
             </button>
             <button onClick={() => setViewMode("list")} className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-white shadow-md text-blue-600" : "text-slate-400"}`}>
               <List size={20} />
             </button>
          </div>
        </header>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner"><BookOpen /></div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">{enrollments.length}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Enrolled</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner"><Trophy /></div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">{enrollments.filter(en => (progresses[en.course._id] || 0) >= 90).length}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Completed</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner"><Users size={24} /></div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">{new Set(enrollments.map(c => c.course.instructor?.name)).size}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Instructors</p>
              </div>
           </div>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="relative group mb-12">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input
            type="text"
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[1.8rem] focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium text-slate-900 shadow-sm"
            placeholder="Search within your library..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- COURSE LISTING --- */}
        <AnimatePresence mode="wait">
          {filteredEnrollments.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                 <BookOpen size={40} />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Your library is empty</h3>
               <p className="text-slate-500 mb-10 max-w-sm mx-auto">Ready to master a new skill? Browse our catalog and start your journey.</p>
               <button onClick={() => navigate("/courses")} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
                 Explore Courses
               </button>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial="hidden" animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className={viewMode === "grid" ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-6"}
            >
              {filteredEnrollments.map((enrollment) => (
                <motion.div key={enrollment._id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                  <CourseEnrolledcard
                    enrollment={enrollment}
                    progress={progresses[enrollment.course._id] || 0}
                    viewMode={viewMode}
                    onContinue={(courseId) => navigate(`/continue/${courseId}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}