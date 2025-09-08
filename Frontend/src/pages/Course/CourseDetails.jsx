import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BookOpen,
  Edit3,
  User,
  Play,
  Clock,
  Users,
  Star,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Share2,
  Heart,
  Globe,
  Target,
  Video,
  PlayCircle,
} from "lucide-react";
import EnrollButton from "../../components/EnrollButton";
import useEnroll from "../../hooks/useEnroll";
import BACKEND_URL from "../../api";

export default function CourseDetails() {
  const { id } = useParams(); // course id from url
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

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
