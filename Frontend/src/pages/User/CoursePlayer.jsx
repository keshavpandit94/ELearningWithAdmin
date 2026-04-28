<<<<<<< HEAD
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, CheckCircle, Video, Loader2, Sparkles, 
  ChevronRight, Bookmark, ArrowLeft 
} from "lucide-react";
=======
<<<<<<< HEAD
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, CheckCircle, Video, Loader2, Sparkles, 
  ChevronRight, Bookmark, ArrowLeft, X 
} from "lucide-react";
=======
import { useParams } from "react-router-dom";
import { Play, CheckCircle, Video, Clock, Loader2 } from "lucide-react";
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
import useCourseProgress from "../../hooks/useCourseProgress";

function formatVideoTime(seconds = 0) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function CoursePlayer({ token }) {
  const { courseId } = useParams();
<<<<<<< HEAD
  const navigate = useNavigate();
=======
<<<<<<< HEAD
  const navigate = useNavigate(); // For the back button
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949

  let userId;
  if (typeof window !== "undefined") {
    try {
      const u = localStorage.getItem("user");
      userId = u ? JSON.parse(u)?._id : undefined;
<<<<<<< HEAD
    } catch { 
      userId = undefined; 
    }
=======
<<<<<<< HEAD
    } catch { userId = undefined; }
=======
    } catch {
      userId = undefined;
    }
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
              controlsList="nodownload"
            />
          </div>

          {/* Resume Prompt */}
=======
            />
          </div>

>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
=======
=======
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="ml-2 text-lg font-medium text-gray-700">
          Loading course...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Video Player Section */}
      <div className="flex-1 p-4 lg:p-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">{course?.title}</h1>
        <p className="text-gray-600 mb-3 text-sm sm:text-base">
          Overall Progress:{" "}
          <span className="font-semibold text-indigo-600">{completionPercent}%</span>
        </p>

        {lastWatchedVideo && (
          <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
            <span className="text-sm text-gray-700 font-medium">Last watched:</span>
            <span className="ml-2 text-indigo-700 font-semibold">
              {lastWatchedVideo.title}
            </span>
            <span className="ml-2 text-gray-500 text-xs">
              ({Math.round(lastWatchedVideo.percent || 0)}% · at{" "}
              {formatVideoTime(lastWatchedVideo.lastTimestamp || 0)})
            </span>
          </div>
        )}

        <div className="bg-black rounded-2xl overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            key={currentVideo?._id}
            src={currentVideo?.url}
            className="w-full aspect-video"
            onTimeUpdate={(e) => {
              if (currentVideo) {
                const percent =
                  (e.target.currentTime / e.target.duration) * 100;
                handleProgress(
                  String(currentVideo._id),
                  percent,
                  Math.floor(e.target.currentTime)
                );
              }
            }}
            onEnded={handleVideoEnded}
            controls
          />
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 lg:p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
          <Video size={20} className="text-indigo-600" /> Course Content
        </h2>
        <ul className="space-y-3">
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          {course?.videos?.map((vid, index) => {
            const vidProgress = progress[vid._id] || {};
            const watched = vidProgress.completed;
            const isActive = currentVideo?._id === vid._id;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949

            return (
              <motion.button
                key={vid._id}
                whileHover={{ scale: 1.02, x: 5 }}
<<<<<<< HEAD
                whileTap={{ scale: 0.98 }}
=======
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
}
=======
}
=======
            return (
              <li
                key={vid._id}
                onClick={() => handleVideoChange(vid)}
                className={[
                  "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all shadow-sm border",
                  isActive
                    ? "bg-indigo-50 border-indigo-400"
                    : watched
                    ? "bg-green-50 border-green-300"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  {watched ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Play
                      className={isActive ? "text-indigo-600" : "text-gray-400"}
                      size={20}
                    />
                  )}
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isActive ? "text-indigo-700" : "text-gray-800"
                      }`}
                    >
                      {index + 1}. {vid.title}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} className="text-gray-400" />
                      {Math.round(vidProgress.percent || 0)}% watched
                      {vidProgress.lastTimestamp !== undefined && (
                        <> · stopped at {formatVideoTime(vidProgress.lastTimestamp)}</>
                      )}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
