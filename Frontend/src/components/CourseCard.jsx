import React from "react";
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
        {course.thumbnail?.url ? (
          <img
            src={course.thumbnail.url}
            alt={course.title}
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
