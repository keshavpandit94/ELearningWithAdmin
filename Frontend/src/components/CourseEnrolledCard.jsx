import React from "react";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
import { BookOpen, Users, Play, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseEnrolledcard({ enrollment, progress, viewMode, onContinue }) {
  const { course } = enrollment;
  const isCompleted = progress === 100;
<<<<<<< HEAD
  
  // Safely get instructor name from the integrated logic
  const instructorName = course?.instructor?.name || "Expert Instructor";
=======
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949

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
<<<<<<< HEAD
        
        {/* Status Overlay Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-sm border border-slate-100">
=======
        {/* Status Overlay */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
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
=======
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md uppercase">
              {course?.category || "Course"}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
            {course.title}
          </h3>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
<<<<<<< HEAD
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mastery</span>
=======
              <span className="text-xs font-bold text-slate-500">Course Progress</span>
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
=======
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
                }`}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className={viewMode === "grid" ? "w-full" : "w-full md:w-auto"}>
          <button
            onClick={() => onContinue(course._id)}
<<<<<<< HEAD
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
              isCompleted
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
              : "bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200 hover:shadow-blue-100"
=======
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all active:scale-95 ${
              isCompleted
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
              : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200"
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
            }`}
          >
            {isCompleted ? "Review Materials" : (
              <>
<<<<<<< HEAD
                <Play size={14} fill="currentColor" />
=======
                <Play size={16} fill="currentColor" />
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
                Continue Learning
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
<<<<<<< HEAD
=======
=======
import { BookOpen, GraduationCap, Users, Loader2, Search, Grid3X3, List } from "lucide-react"
import { useNavigate } from "react-router-dom";


export default function CourseEnrolledcard({ enrollment, progress, viewMode, onContinue }) {
  const { course } = enrollment;
  console.log(course)
  const instructorName = course.instructor?.name || "Instructor";
  return (
    <div
      className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100
      ${viewMode === "grid" ? "" : "flex gap-4 items-center"}`
      }>
      {/* Thumbnail */}
      {viewMode !== "grid" && (
        <div className="min-w-[100px] min-h-[70px] flex items-center">
          <img
            src={course?.thumbnail?.url}
            alt={course?.title}
            className="h-20 w-28 object-cover rounded-l-xl"
            loading="lazy"
          />
        </div>
      )}
      <div className={viewMode === "grid" ? "" : "flex-1"}>
        {/* Header */}
        <div className={`p-6 pb-4 ${viewMode === "grid" ? "" : "pb-2 pt-4"}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
              <Users className="w-3 h-3 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">
                Enrolled
              </span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
        </div>
        {/* Instructor */}
        <div className="px-6 pb-2 border-t border-gray-50">
          <div className="flex items-center gap-2 text-gray-600">
            {/* <Users className="w-4 h-4 text-blue-500" /> */}
            {/* <span className="text-sm font-medium">{instructorName}</span> */}
          </div>
        </div>
        {/* Progress */}
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Progress: {progress}%</p>
        </div>
        {/* Action */}
        <div className="px-6 pb-6">
          <button
            onClick={() => onContinue(course._id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  );
}