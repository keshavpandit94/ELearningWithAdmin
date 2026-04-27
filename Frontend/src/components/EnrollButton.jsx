<<<<<<< HEAD
import React from "react";
import { CheckCircle, Play, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useEnroll from "../hooks/useEnroll.js";

export default function EnrollButton({ course, token, user }) {
  const { enroll, isEnrolled, loading } = useEnroll({
    token,
    user,
    courseId: course._id,
  });

  return (
    <motion.button
      whileHover={!isEnrolled && !loading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isEnrolled && !loading ? { scale: 0.98 } : {}}
      onClick={() => enroll(course)}
      disabled={isEnrolled || loading}
      className={`relative w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold transition-all duration-300 mb-4 overflow-hidden ${
        isEnrolled
          ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default"
          : "bg-slate-900 text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]"
      }`}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </motion.div>
        ) : isEnrolled ? (
          <motion.div
            key="enrolled"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-emerald-500 rounded-full p-0.5">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span className="tracking-wide">Enrolled</span>
          </motion.div>
        ) : (
          <motion.div
            key="enroll-now"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-blue-500 rounded-lg p-1.5 shadow-lg shadow-blue-500/30">
                <Play className="w-4 h-4 text-white fill-current" />
            </div>
            <span className="text-lg">Enroll in Course</span>
            <Sparkles className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Shine Effect for the "Enroll Now" state */}
      {!isEnrolled && !loading && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
      )}
    </motion.button>
  );
}
=======
import { CheckCircle, Play } from "lucide-react";
import useEnroll from "../hooks/useEnroll.js";
import axios from "axios";

export default function EnrollButton({ course, token, user,  }) {
  const { enroll, isEnrolled, loading } = useEnroll({ token, user, courseId: course._id });

  // console.log(token)
  // console.log(user)
    // console.log(isEnrolled)

  // const checkEnrolled = () => {
  //   axios.get()
  //   .then()
  //   .catch()

  // }
  return (
    <button
      onClick={() => enroll(course)}
      disabled={isEnrolled || loading}
      className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-all duration-200 mb-4 ${
        isEnrolled
          ? "bg-green-100 text-green-700 cursor-default"
          : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:scale-105 shadow-lg"
      }`}
    >
      {isEnrolled ? (
        <>
          <CheckCircle className="w-5 h-5" />
          Enrolled
        </>
      ) : (
        <>
          <Play className="w-5 h-5" />
          {loading ? "Processing..." : "Enroll Now"}
        </>
      )}
    </button>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
