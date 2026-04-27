import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Edit3,
  User,
  Play,
  Clock,
  Users,
  Star,
  Loader2,
  ArrowLeft,
  Share2,
  Heart,
  PlayCircle,
  Lock,
  Calendar,
  Languages
} from "lucide-react";
import EnrollButton from "../../components/EnrollButton";
import useEnroll from "../../hooks/useEnroll";
import BACKEND_URL from "../../api";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const { isEnrolled, enroll, refreshEnrollment, isLoading: enrolling } = useEnroll({ id });

  useEffect(() => {
    if (token) {
      axios.get(`${BACKEND_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    }

    setLoading(true);
    axios.get(`${BACKEND_URL}/api/courses/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => setCourse(res.data))
      .catch(() => navigate("/courses"))
      .finally(() => setLoading(false));
  }, [id, token, navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#fafafa]">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-slate-500 font-bold tracking-tight">Curating course content...</p>
      </motion.div>
    </div>
  );

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      {/* --- HERO HEADER --- */}
      <div className="bg-slate-900 text-white pt-32 pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.button 
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold"
          >
            <ArrowLeft size={16} /> BACK TO CATALOG
          </motion.button>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]"
              >
                {course.title}
              </motion.h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm font-bold">
                <div className="flex items-center gap-2 text-amber-400">
                  <Star size={18} fill="currentColor" /> {course.rating || 4.8} (Reviews)
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Users size={18} /> {course.students?.toLocaleString()} Students
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock size={18} /> {course.duration || "12 Hours"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* LEFT: Player & Curriculum */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player Card */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-700"
            >
              <div className="aspect-video relative bg-black">
                {isEnrolled ? (
                  <video 
                    controls 
                    className="w-full h-full object-contain" 
                    src={course.videos[activeVideo]?.url} 
                    poster={course.thumbnail?.url} 
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                      <Lock size={32} className="text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Content Locked</h3>
                    <p className="text-slate-400 mb-6">Enroll in this course to unlock all {course.videos?.length} lessons.</p>
                  </div>
                )}
              </div>
              <div className="p-6 bg-slate-900 flex items-center justify-between">
                <h2 className="text-white font-bold truncate">
                  {activeVideo + 1}. {course.videos[activeVideo]?.title}
                </h2>
                <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Now Playing</span>
              </div>
            </motion.div>

            {/* Curriculum List */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black mb-6 tracking-tight">Course Curriculum</h3>
              <div className="space-y-3">
                {course.videos?.map((video, idx) => (
                  <button
                    key={video._id}
                    onClick={() => isEnrolled && setActiveVideo(idx)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all text-left border ${
                      activeVideo === idx 
                      ? "bg-blue-50 border-blue-100 text-blue-700 shadow-sm" 
                      : "bg-white border-transparent hover:border-slate-200"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      activeVideo === idx ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}>
                      {activeVideo === idx ? <Play size={18} fill="currentColor" /> : <PlayCircle size={18} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold leading-tight mb-1">{video.title}</p>
                      <p className="text-xs opacity-60">Lesson {idx + 1} • {video.duration || "10:00"}</p>
                    </div>
                    {!isEnrolled && idx !== 0 && <Lock size={14} className="text-slate-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructor Bento Card */}
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
              <div className="shrink-0">
                {course.instructor?.avatar ? (
                  <img src={course.instructor.avatar} className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20" alt="Avatar" />
                ) : (
                  <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center"><User size={48} /></div>
                )}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full mb-3 inline-block">Course Creator</span>
                <h3 className="text-2xl font-bold mb-2">{course.instructor?.name}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{course.instructor?.bio || "Expert instructor dedicated to student success."}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Floating Enrollment Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100"
              >
                <div className="text-center mb-8">
                  {course.isFree ? (
                    <span className="text-4xl font-black text-emerald-500">FREE</span>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">
                        ₹{course.discountPrice > 0 ? course.discountPrice : course.price}
                      </p>
                      {course.discountPrice > 0 && (
                        <span className="text-slate-400 line-through font-bold">₹{course.price}</span>
                      )}
                    </div>
                  )}
                </div>

                <EnrollButton 
                  course={course} 
                  isEnrolled={isEnrolled} 
                  enroll={enroll} 
                  token={token} 
                  user={user} 
                  refreshEnrollment={refreshEnrollment} 
                />

                <div className="flex gap-4 mt-6">
                  <button className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Heart size={16} /> Save
                  </button>
                  <button className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Share2 size={16} /> Share
                  </button>
                </div>

                {/* Course Facts Bento */}
                <div className="mt-8 space-y-4 pt-8 border-t border-slate-50">
                   <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                      <Calendar size={18} className="text-blue-600" />
                      <span>Last Updated: {course.lastUpdated || "2026"}</span>
                   </div>
                   <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                      <Languages size={18} className="text-blue-600" />
                      <span>Language: {course.language || "English"}</span>
                   </div>
                </div>
              </motion.div>

              {user?.role === "instructor" && user?._id === course.instructor?._id && (
                <button
                  onClick={() => navigate(`/edit-course/${course._id}`)}
                  className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 size={18} /> EDIT COURSE
                </button>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}