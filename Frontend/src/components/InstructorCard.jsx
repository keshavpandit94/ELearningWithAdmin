import React from "react";

export default function InstructorCard({ instructor }) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        {instructor.profilePicture?.url ? (
          <img
            src={instructor.profilePicture.url}
            alt={instructor.name}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 uppercase text-lg font-bold">
            {instructor.name?.[0] || "I"}
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            {instructor.name}
          </h3>
          <p className="text-sm md:text-base text-gray-500 truncate max-w-[180px]">
            {instructor.email}
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
        {instructor.bio || "No bio provided."}
      </p>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-3">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium py-2 px-4 rounded-lg transition-colors">
          View Profile
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm md:text-base font-medium py-2 px-4 rounded-lg transition-colors">
          Contact
        </button>
      </div>
    </div>
  );
}
