import React from "react";
import { motion } from "framer-motion";
import { Mail, UserCircle, ExternalLink } from "lucide-react";

export default function InstructorCard({ instructor, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group w-full max-w-sm mx-auto bg-white rounded-[2.5rem] p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 -z-0" />

      <div className="relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            {instructor.profilePicture?.url ? (
              <img
                src={instructor.profilePicture.url}
                alt={instructor.name}
                className="w-24 h-24 rounded-[2rem] object-cover border-4 border-white shadow-xl group-hover:rotate-3 transition-transform"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] text-white text-3xl font-black shadow-xl">
                {instructor.name?.[0] || "I"}
              </div>
            )}
            {/* Online Status Dot */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {instructor.name}
          </h3>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2 uppercase tracking-wider">
            Verified Mentor
          </span>
        </div>

        {/* Bio Section */}
        <p className="mt-6 text-slate-500 text-sm leading-relaxed text-center line-clamp-3 min-h-[60px]">
          {instructor.bio || "Leading expert in the field with a passion for teaching and student success."}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3">
          <button 
            onClick={onClick}
            className="flex-2 flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-bold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-200 active:scale-95 flex-grow"
          >
            <UserCircle size={18} />
            View Profile
          </button>
          
          <button className="flex-1 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl transition-all duration-300 active:scale-95">
            <Mail size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}