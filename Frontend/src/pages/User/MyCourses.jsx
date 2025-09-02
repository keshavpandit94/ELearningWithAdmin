import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, User, GraduationCap, Users, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BACK_URL from "../../api";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${BACK_URL}/api/enrollments/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        const enrolledCourse = data.filter((item) => item.status === "enrolled");
        setCourses(enrolledCourse || []);
      })
      .catch(() => {
        setError("Failed to load your courses. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-1">
              {courses.length > 0
                ? `${courses.length} course${courses.length === 1 ? "" : "s"} enrolled`
                : "Start your learning journey"}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No courses yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven&apos;t enrolled in any courses yet. Discover amazing courses and start learning today!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
              Browse Courses
            </button>
          </div>
        ) : (
          <>
            {/* Courses Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course) => {
                const progress = Math.floor(Math.random() * 100);
                return (
                  <div
                    key={course._id}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
                  >
                    {/* Header */}
                    <div className="p-6 pb-4">
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
                        {course.course.title}
                      </h3>
                    </div>

                    {/* Instructor */}
                    <div className="px-6 pb-4 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">
                          {course.course.instructor?.name || "Instructor"}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="px-6 pb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Progress: {progress}%</p>
                    </div>

                    {/* Action */}
                    <div className="px-6 pb-6">
                      <button
                        onClick={() => navigate(`/continue/${course.course._id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                    <p className="text-sm text-gray-600">Total Courses</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.floor(Math.random() * courses.length + 1)}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Users className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Set(courses.map((c) => c.course.instructor?.name)).size}
                    </p>
                    <p className="text-sm text-gray-600">Instructors</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
