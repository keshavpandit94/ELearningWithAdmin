import React from "react";
<<<<<<< HEAD
import { motion } from "framer-motion";
import { Mail, UserCircle } from "lucide-react";
=======
<<<<<<< HEAD
import { motion } from "framer-motion";
import { Mail, UserCircle, ExternalLink } from "lucide-react";
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949

export default function InstructorCard({ instructor, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
<<<<<<< HEAD
      className="relative group w-full max-w-sm mx-auto bg-white rounded-[2.5rem] p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all overflow-hidden cursor-pointer"
      onClick={onClick}
=======
      className="relative group w-full max-w-sm mx-auto bg-white rounded-[2.5rem] p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all overflow-hidden"
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
          <p className="text-xs text-slate-400 mt-1 lowercase font-medium">{instructor.email}</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-3 uppercase tracking-widest">
=======
          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2 uppercase tracking-wider">
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
            className="flex-2 flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-black uppercase tracking-widest py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-200 active:scale-95 flex-grow"
=======
            onClick={onClick}
            className="flex-2 flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-bold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-200 active:scale-95 flex-grow"
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          >
            <UserCircle size={18} />
            View Profile
          </button>
          
<<<<<<< HEAD
          <button 
            onClick={(e) => {
                e.stopPropagation(); // Prevent card onClick from firing
                window.location.href = `mailto:${instructor.email}`;
            }}
            className="flex-1 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl transition-all duration-300 active:scale-95"
          >
=======
          <button className="flex-1 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl transition-all duration-300 active:scale-95">
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
            <Mail size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
<<<<<<< HEAD
}
=======
}
=======

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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
