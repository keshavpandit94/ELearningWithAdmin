import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, CheckCircle, Video, Loader2, Sparkles, 
  ChevronRight, Bookmark, ArrowLeft 
} from "lucide-react";
import useCourseProgress from "../../hooks/useCourseProgress";

function formatVideoTime(seconds = 0) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function CoursePlayer({ token }) {
  const { courseId } = useParams();
  const navigate = useNavigate();

  let userId;
  if (typeof window !== "undefined") {
    try {
      const u = localStorage.getItem("user");
      userId = u ? JSON.parse(u)?._id : undefined;
    } catch { 
      userId = undefined; 
    }
  }

  const {
    course,
    progress,
    currentVideo,
    lastWatchedVideo,
    loading,
    handleProgress,
    handleVideoChange,
    handleVideoEnded,
    completionPercent,
    videoRef,
  } = useCourseProgress(courseId, { token, userId });

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fafafa]">
      <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing your progress...</p>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#fafafa] overflow-hidden">
      
      {/* --- Close / Back Button (Floating) --- */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/my-courses")}
        className="fixed top-6 left-6 z-[100] flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl text-slate-900 font-black text-xs shadow-xl hover:bg-white transition-all group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        EXIT PLAYER
      </motion.button>

      {/* --- Main Video Section --- */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
          
          {/* Header Info */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-2">
                {course?.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black">
                  <Sparkles size={14} /> Lesson {course?.videos?.findIndex(v => v._id === currentVideo?._id) + 1} of {course?.videos?.length}
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  Overall Progress: <span className="text-slate-900 font-bold">{completionPercent}%</span>
                </span>
              </div>
            </div>
          </div>

          {/* Video Container */}
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 relative group">
            <video
              ref={videoRef}
              key={currentVideo?._id}
              src={currentVideo?.url}
              className="w-full aspect-video shadow-2xl"
              onTimeUpdate={(e) => {
                if (currentVideo) {
                  const percent = (e.target.currentTime / e.target.duration) * 100;
                  handleProgress(String(currentVideo._id), percent, Math.floor(e.target.currentTime));
                }
              }}
              onEnded={handleVideoEnded}
              controls
              controlsList="nodownload"
            />
          </div>

          {/* Resume Prompt */}
          <AnimatePresence>
            {lastWatchedVideo && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
                    <Bookmark size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Resume Watching</p>
                    <p className="text-slate-900 font-bold">{lastWatchedVideo.title}</p>
                  </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-400">Stopped at {formatVideoTime(lastWatchedVideo.lastTimestamp)}</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase">{Math.round(lastWatchedVideo.percent)}% Completed</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- Curriculum Sidebar --- */}
      <aside className="w-full lg:w-[400px] bg-white border-l border-slate-100 flex flex-col h-screen sticky top-0 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-50 pt-10">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Video size={22} className="text-blue-600" /> Curriculum
          </h2>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} animate={{ width: `${completionPercent}%` }}
              className="h-full bg-blue-600 rounded-full" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {course?.videos?.map((vid, index) => {
            const vidProgress = progress[vid._id] || {};
            const watched = vidProgress.completed;
            const isActive = currentVideo?._id === vid._id;

            return (
              <motion.button
                key={vid._id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVideoChange(vid)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border text-left ${
                  isActive 
                  ? "bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-100" 
                  : watched 
                  ? "bg-emerald-50/50 border-emerald-100 text-slate-700" 
                  : "bg-white border-transparent hover:border-slate-200 text-slate-600"
                }`}
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  isActive ? "bg-white/20" : watched ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {watched ? <CheckCircle size={18} /> : <Play size={18} fill={isActive ? "white" : "none"} />}
                </div>

                <div className="flex-1 overflow-hidden">
                  <p className={`text-sm font-bold truncate ${isActive ? "text-white" : "text-slate-900"}`}>
                    {index + 1}. {vid.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-black uppercase ${isActive ? "text-blue-100" : "text-slate-400"}`}>
                      {Math.round(vidProgress.percent || 0)}% Viewed
                    </span>
                    {watched && <span className="text-[10px] font-black text-emerald-500 uppercase">Completed</span>}
                  </div>
                </div>
                <ChevronRight size={16} className={isActive ? "text-white/50" : "text-slate-300"} />
              </motion.button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}