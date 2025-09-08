import React from "react";
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
  );
}