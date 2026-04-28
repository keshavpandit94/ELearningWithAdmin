import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
=======
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
import {
  BookOpen,
  Edit3,
  User,
  Play,
  Clock,
  Users,
  Star,
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  CheckCircle,
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  Loader2,
  ArrowLeft,
  Share2,
  Heart,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  PlayCircle,
  Lock,
  Calendar,
  Languages
<<<<<<< HEAD
=======
=======
  Globe,
  Target,
  Video,
  PlayCircle,
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
} from "lucide-react";
import EnrollButton from "../../components/EnrollButton";
import useEnroll from "../../hooks/useEnroll";
import BACKEND_URL from "../../api";

export default function CourseDetails() {
<<<<<<< HEAD
  const { id } = useParams();
=======
<<<<<<< HEAD
  const { id } = useParams();
=======
  const { id } = useParams(); // course id from url
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  const { isEnrolled, enroll, refreshEnrollment, isLoading: enrolling } = useEnroll({ id });

  useEffect(() => {
    if (token) {
      axios.get(`${BACKEND_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
<<<<<<< HEAD
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        });
=======
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    }

    setLoading(true);
    axios.get(`${BACKEND_URL}/api/courses/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => setCourse(res.data))
<<<<<<< HEAD
      .catch((err) => {
        console.error(err);
        navigate("/courses");
      })
=======
      .catch(() => navigate("/courses"))
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      .finally(() => setLoading(false));
  }, [id, token, navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#fafafa]">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-slate-500 font-bold tracking-tight">Curating course content...</p>
      </motion.div>
    </div>
  );

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      {/* --- HERO HEADER --- */}
      <div className="bg-slate-900 text-white pt-32 pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.button 
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold"
          >
            <ArrowLeft size={16} /> BACK TO CATALOG
          </motion.button>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]"
              >
                {course.title}
              </motion.h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm font-bold">
                <div className="flex items-center gap-2 text-amber-400">
                  <Star size={18} fill="currentColor" /> {course.rating || 4.8} (Reviews)
                </div>
                <div className="flex items-center gap-2 text-slate-300">
<<<<<<< HEAD
                  <Users size={18} /> {course.students?.toLocaleString() || "0"} Students
=======
                  <Users size={18} /> {course.students?.toLocaleString()} Students
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock size={18} /> {course.duration || "12 Hours"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
<<<<<<< HEAD
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
=======
        <div className="grid lg:grid-cols-3 gap-10">
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          
          {/* LEFT: Player & Curriculum */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player Card */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-700"
            >
              <div className="aspect-video relative bg-black">
                {isEnrolled ? (
                  <video 
                    controls 
                    className="w-full h-full object-contain" 
<<<<<<< HEAD
                    src={course.videos?.[activeVideo]?.url} 
=======
                    src={course.videos[activeVideo]?.url} 
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
                    poster={course.thumbnail?.url} 
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                      <Lock size={32} className="text-blue-400" />
                    </div>
<<<<<<< HEAD
                    <h3 className="text-2xl font-bold mb-2 text-white">Content Locked</h3>
                    <p className="text-slate-400 mb-6">Enroll in this course to unlock all {course.videos?.length || 0} lessons.</p>
=======
                    <h3 className="text-2xl font-bold mb-2">Content Locked</h3>
                    <p className="text-slate-400 mb-6">Enroll in this course to unlock all {course.videos?.length} lessons.</p>
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
                  </div>
                )}
              </div>
              <div className="p-6 bg-slate-900 flex items-center justify-between">
                <h2 className="text-white font-bold truncate">
<<<<<<< HEAD
                  {course.videos?.length > 0 ? `${activeVideo + 1}. ${course.videos[activeVideo]?.title}` : "No videos available"}
                </h2>
                {isEnrolled && <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Now Playing</span>}
=======
                  {activeVideo + 1}. {course.videos[activeVideo]?.title}
                </h2>
                <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Now Playing</span>
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
              </div>
            </motion.div>

            {/* Curriculum List */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black mb-6 tracking-tight">Course Curriculum</h3>
              <div className="space-y-3">
                {course.videos?.map((video, idx) => (
                  <button
                    key={video._id}
                    onClick={() => isEnrolled && setActiveVideo(idx)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all text-left border ${
                      activeVideo === idx 
                      ? "bg-blue-50 border-blue-100 text-blue-700 shadow-sm" 
                      : "bg-white border-transparent hover:border-slate-200"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      activeVideo === idx ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}>
                      {activeVideo === idx ? <Play size={18} fill="currentColor" /> : <PlayCircle size={18} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold leading-tight mb-1">{video.title}</p>
                      <p className="text-xs opacity-60">Lesson {idx + 1} • {video.duration || "10:00"}</p>
                    </div>
                    {!isEnrolled && idx !== 0 && <Lock size={14} className="text-slate-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructor Bento Card */}
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
              <div className="shrink-0">
                {course.instructor?.avatar ? (
                  <img src={course.instructor.avatar} className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20" alt="Avatar" />
                ) : (
                  <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center"><User size={48} /></div>
                )}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full mb-3 inline-block">Course Creator</span>
                <h3 className="text-2xl font-bold mb-2">{course.instructor?.name}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{course.instructor?.bio || "Expert instructor dedicated to student success."}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Floating Enrollment Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100"
              >
                <div className="text-center mb-8">
                  {course.isFree ? (
                    <span className="text-4xl font-black text-emerald-500">FREE</span>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">
                        ₹{course.discountPrice > 0 ? course.discountPrice : course.price}
                      </p>
                      {course.discountPrice > 0 && (
                        <span className="text-slate-400 line-through font-bold">₹{course.price}</span>
                      )}
                    </div>
                  )}
                </div>

                <EnrollButton 
                  course={course} 
                  isEnrolled={isEnrolled} 
                  enroll={enroll} 
                  token={token} 
                  user={user} 
                  refreshEnrollment={refreshEnrollment} 
                />

                <div className="flex gap-4 mt-6">
                  <button className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Heart size={16} /> Save
                  </button>
                  <button className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Share2 size={16} /> Share
                  </button>
                </div>

                {/* Course Facts Bento */}
                <div className="mt-8 space-y-4 pt-8 border-t border-slate-50">
                   <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                      <Calendar size={18} className="text-blue-600" />
                      <span>Last Updated: {course.lastUpdated || "2026"}</span>
                   </div>
                   <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                      <Languages size={18} className="text-blue-600" />
                      <span>Language: {course.language || "English"}</span>
                   </div>
                </div>
              </motion.div>

              {user?.role === "instructor" && user?._id === course.instructor?._id && (
                <button
                  onClick={() => navigate(`/edit-course/${course._id}`)}
                  className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 size={18} /> EDIT COURSE
                </button>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
=======

  // Use your enroll hook to get enrollment status and actions
  const { isEnrolled, enroll, refreshEnrollment, isLoading: enrolling } = useEnroll({ id });

  // Fetch user info & course details on mount or on id/token change
  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      axios
        .get(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        });
    }

    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/courses/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => setCourse(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch course details.");
        navigate("/courses");
      })
      .finally(() => setLoading(false));
  }, [id, token, navigate]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading course details...</p>
        </div>
      </div>
    );

  if (!course) return null; // or a message

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            onClick={() => navigate("/courses")}
          >
            <ArrowLeft className="w-4 h-4" /> Back to courses
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-14">
        {/* Left: Course info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 text-blue-600 text-3xl">
            <BookOpen size={40} />
            <h1 className="font-semibold">{course.title}</h1>
          </div>
          <p className="text-gray-700 text-lg">{course.description}</p>

          <div className="flex gap-6">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={20} /> {course.rating || 4.5}
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Users size={20} /> {course.students?.toLocaleString() || "0"} students
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock size={20} /> {course.duration || "N/A"}
            </div>
          </div>

          {/* Instructor */}
          <div className="bg-gray-100 p-6 rounded-lg flex items-center gap-4">
            {course.instructor?.avatar ? (
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <User size={80} className="text-blue-600" />
            )}
            <div>
              <h3 className="font-bold text-xl">{course.instructor?.name}</h3>
              <p className="text-gray-600">{course.instructor?.bio}</p>
            </div>
          </div>

          {/* Video list & player */}
          {course.videos && course.videos.length > 0 && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video list */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-y-auto max-h-[480px]">
                <h2 className="text-xl font-semibold p-4 border-b border-gray-200">Course Lessons</h2>
                <nav>
                  {course.videos.map((video, idx) => (
                    <button
                      key={video._id}
                      onClick={() => setActiveVideo(idx)}
                      className={`flex w-full items-center gap-3 p-4 text-left transition ${
                        activeVideo === idx
                          ? "bg-blue-100 border-l-4 border-blue-600 font-semibold text-blue-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <PlayCircle className="text-blue-600" size={24} />
                      <span>{idx + 1}. {video.title}</span>
                      <time className="ml-auto text-gray-500">{video.duration}</time>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Video player */}
              <div className="lg:col-span-2 bg-black rounded-lg shadow-lg overflow-hidden relative pb-[56.25%]">
                {isEnrolled ? (
                  <video
                    controls
                    src={course.videos[activeVideo].url}
                    poster={course.thumbnail?.url}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
                    <Play size={48} className="mb-6" />
                    <h3 className="text-2xl mb-2">Preview Available</h3>
                    <p className="mb-4">Enroll to access full lessons and course content.</p>
                    <button
                      onClick={enroll}
                      disabled={enrolling}
                      className="bg-green-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-green-700 disabled:opacity-60"
                    >
                      {enrolling ? "Processing..." : "Enroll Now"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Enrollment Card */}
        <aside className="bg-white p-6 rounded-lg shadow sticky top-24 space-y-6">
          {/* Price */}
          <div className="text-center">
            {course.isFree ? (
              <span className="text-green-600 text-3xl font-bold">Free</span>
            ) : (
              <>
                <span className="text-4xl font-bold">
                  ₹{course.discountPrice > 0 ? course.discountPrice : course.price}
                </span>
                {course.discountPrice > 0 && (
                  <span className="line-through text-gray-500 text-lg ml-3">
                    ₹{course.price}
                  </span>
                )}
                <p className="text-gray-600 pt-1">One-time Payment</p>
              </>
            )}
          </div>

          {/* Enroll Button */}
          <EnrollButton
            course={course}
            isEnrolled={isEnrolled}
            enroll={enroll}
            token={token}
            user={user}
            refreshEnrollment={refreshEnrollment}
          />

          {/* Social buttons */}
          <div className="flex gap-3 justify-center">
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
              <Heart size={16} /> Save
            </button>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
              <Share2 size={16} /> Share
            </button>
          </div>

          {/* Edit button */}
          {user?.role === "instructor" && user?._id === course.instructor?._id && (
            <button
              onClick={() => navigate(`/edit-course/${course._id}`)}
              className="w-full mt-6 flex items-center gap-2 justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              <Edit3 size={18} /> Edit Course
            </button>
          )}

          {/* Features */}
          {course.features && (
            <section className="pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-4">What this course includes:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {course.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Additional info */}
          <section className="pt-6 border-t border-gray-200 space-y-3 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span>Students Enrolled</span>
              <span>{course.students?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span>{course.lastUpdated || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span>Language</span>
              <span>{course.language || "-"}</span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
