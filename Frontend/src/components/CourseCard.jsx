import React from "react";
import { User, Clock, Play, Eye, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CardComponents({
  course,
  status,
  navigate,
  viewMode = "grid"
}) {
  // logic to determine where the user goes based on enrollment status
  const destination = status === "enrolled" ? `/continue/${course._id}` : `/courses/${course._id}`;
  const buttonLabel = status === "enrolled" ? "Continue" : "View Course";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(destination)}
      className={`group relative bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all overflow-hidden cursor-pointer ${
        viewMode === "list" ? "flex flex-col md:flex-row p-4 gap-6" : "flex flex-col h-full"
      }`}
    >
      {/* --- Thumbnail Wrapper --- */}
      <div className={`relative overflow-hidden ${
        viewMode === "list" ? "w-full md:w-64 h-44 flex-shrink-0 rounded-2xl" : "w-full h-52"
      }`}>
        {course.thumbnail?.url ? (
          <img
            src={course.thumbnail.url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-blue-200" />
          </div>
        )}
        
        {/* Floating Student Count Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5">
            <Eye size={14} className="text-blue-600" />
            {course.students || 0}
          </div>
        </div>

        {/* Floating "Free" Tag */}
        {course.isFree && (
          <div className="absolute top-4 right-4">
            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
              Free
            </div>
          </div>
        )}
      </div>

      {/* --- Content Body --- */}
      <div className={`flex flex-col flex-1 p-6 ${viewMode === "list" ? "justify-center" : ""}`}>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
             <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {course.title}
            </h3>
          </div>

          {/* Metadata Row */}
          <div className="flex items-center gap-4 mt-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                <User size={14} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">{course.instructor?.name || "Expert"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Clock size={14} />
              <span>{course.duration || "Self-paced"}</span>
            </div>
          </div>
        </div>

        {/* --- Bottom Action & Price --- */}
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            {course.isFree ? (
              <span className="text-xl font-black text-emerald-600 italic">FREE</span>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  ₹{course.discountPrice > 0 ? course.discountPrice : course.price}
                </span>
                {course.discountPrice > 0 && (
                  <span className="text-sm text-slate-400 line-through font-medium">₹{course.price}</span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(destination);
            }}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
              status === "enrolled" 
              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 shadow-md"
            }`}
          >
            {status === "enrolled" ? <Sparkles size={16} /> : <Play size={16} fill="currentColor" />}
            {buttonLabel}
          </button>
        </div>
      </div>
    </motion.div>
  );
}