import React from "react";
import { BookOpen, Users, Play, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseEnrolledcard({ enrollment, progress, viewMode, onContinue }) {
  const { course } = enrollment;
  const isCompleted = progress === 100;
  
  // Safely get instructor name from the integrated logic
  const instructorName = course?.instructor?.name || "Expert Instructor";

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={`group bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all overflow-hidden ${
        viewMode === "grid" ? "flex flex-col h-full" : "flex flex-col md:flex-row items-center p-4 gap-6"
      }`}
    >
      {/* --- Thumbnail Area --- */}
      <div className={`relative overflow-hidden shrink-0 ${
        viewMode === "grid" ? "w-full h-44" : "w-full md:w-56 h-36 rounded-2xl"
      }`}>
        <img
          src={course?.thumbnail?.url}
          alt={course?.title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Status Overlay Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-sm border border-slate-100">
            {isCompleted ? (
              <Trophy size={14} className="text-yellow-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            )}
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
              {isCompleted ? "Completed" : "In Progress"}
            </span>
          </div>
        </div>
      </div>

      {/* --- Content Area --- */}
      <div className="flex-1 p-6 flex flex-col w-full">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <BookOpen size={14} className="text-blue-600" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {course?.category || "Course"}
              </span>
            </div>
            <div className="flex items-center gap-1 opacity-60">
              <Users size={12} />
              <span className="text-[10px] font-bold uppercase">{instructorName}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {course.title}
          </h3>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mastery</span>
              <span className="text-xs font-black text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-[2px]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  isCompleted 
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500" 
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className={viewMode === "grid" ? "w-full" : "w-full md:w-auto"}>
          <button
            onClick={() => onContinue(course._id)}
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
              isCompleted
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
              : "bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200 hover:shadow-blue-100"
            }`}
          >
            {isCompleted ? "Review Materials" : (
              <>
                <Play size={14} fill="currentColor" />
                Continue Learning
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}