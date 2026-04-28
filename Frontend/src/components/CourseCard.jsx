import React from "react";
<<<<<<< HEAD
import { User, Clock, Play, Eye, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CardComponents({
  course,
  status,
  navigate,
  viewMode = "grid"
}) {
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
        viewMode === "list" ? "w-full md:w-64 h-44 flex-shrink-0" : "w-full h-52"
      }`}>
=======
import { User, Star, Clock, Play, Eye, ChevronRight, BookOpen } from "lucide-react";

export default function CardComponents({
  course,
  status,                // "enrolled" | "pending" | null
  enrolling,             // unused
  enroll,                // unused
  navigate,
  viewMode = "grid"
}) {
  // Where does the card/button go?
  const destination =
    status === "enrolled" ? `/continue/${course._id}` : `/courses/${course._id}`;
  const buttonLabel = status === "enrolled" ? "Continue" : "Course Details";

  return (
    <div
      onClick={() => navigate(destination)}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:scale-105 cursor-pointer ${viewMode === "list" ? "flex gap-6 p-6" : ""
        }`}
    >
      {/* Thumbnail */}
      <div className={`relative ${viewMode === "list" ? "w-48 h-32 flex-shrink-0" : ""}`}>
>>>>>>> 35975c69493032751758ba9568584d2f16146318
        {course.thumbnail?.url ? (
          <img
            src={course.thumbnail.url}
            alt={course.title}
<<<<<<< HEAD
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

        {/* Floating Category/Tag (if available) */}
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
=======
            className={`w-full object-cover ${viewMode === "list" ? "h-32 rounded-lg" : "h-48"}`}
          />
        ) : (
          <div
            className={`bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center ${viewMode === "list" ? "h-32 rounded-lg" : "h-48"}`}
          >
            <BookOpen className="w-12 h-12 text-blue-500" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <div className="bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Eye className="w-3 h-3" /> {course.students || 0}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 flex-1 ${viewMode === "list" ? "p-0" : ""}`}>
        <div className="flex items-start justify-between mb-3">
          <span className="text-xl font-bold text-gray-800 hover:text-blue-600 line-clamp-2">
            {course.title}
          </span>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-2" />
        </div>

        {/* Instructor */}
        {/* <div className="flex items-center gap-2 mb-3">
          <div className="bg-gray-100 p-1.5 rounded-full">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-sm text-gray-600">{course.instructor?.name}</span>
        </div> */}

        {/* Ratings + Duration + Instructor */}
        <div className="flex items-center justify-between mb-4">
          {/* <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{course.rating || "4.5"}</span>
            <span className="text-sm text-gray-500">({course.students || 0})</span>
          </div> */}
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-gray-100 p-1.5 rounded-full">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-sm text-gray-600">{course.instructor?.name}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{course.duration || "8 weeks"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={e => {
              e.stopPropagation();
              navigate(destination);
            }}
            className={`flex items-center gap-1
              ${status === "enrolled" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
              text-white px-4 py-2 rounded-lg text-sm font-medium`}
          >
            <Play className="w-4 h-4" /> {buttonLabel}
          </button>

          {/* Price */}
          <div className="flex flex-col items-end">
            {course.isFree ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <>
                <span className="text-lg font-bold text-gray-800">
                  ₹{course.discountPrice > 0 ? course.discountPrice : course.price}
                </span>
                {course.discountPrice > 0 && (
                  <span className="text-sm text-gray-500 line-through">₹{course.price}</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
