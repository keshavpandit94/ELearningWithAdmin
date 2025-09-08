import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BookOpen, GraduationCap, Users, Loader2, Search, Grid3X3, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BACK_URL from "../../api";
import CourseEnrolledcard from "../../components/CourseEnrolledCard";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [progresses, setProgresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch enrollments and their progresses
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${BACK_URL}/api/enrollments/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (res) => {
        const enrolled = (res.data || []).filter((item) => item.status === "enrolled");
        console.log(enrolled)
        setEnrollments(enrolled);

        // Fetch progress for each enrolled course
        const progressPromises = enrolled.map((item) =>
          axios
            .get(`${BACK_URL}/api/progress/${item.course._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((progRes) => ({
              courseId: item.course._id,
              progress: computeCourseProgress(progRes.data.videos),
            }))
            .catch(() => ({
              courseId: item.course._id,
              progress: 0,
            }))
        );
        const results = await Promise.all(progressPromises);
        const progMap = {};
        results.forEach((r) => (progMap[r.courseId] = r.progress));
        setProgresses(progMap);
      })
      .catch(() => {
        setError("Failed to load your courses. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  // Helper: compute progress (percent complete) given progress API videos array
  function computeCourseProgress(videos = []) {
    if (!videos || videos.length === 0) return 0;
    const completed = videos.filter((v) => v.completed).length;
    return Math.round((completed / videos.length) * 100);
  }

  // Filtering/search
  const filteredEnrollments = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return enrollments;
    return enrollments.filter(
      (item) =>
        item.course.title.toLowerCase().includes(search) ||
        item.course.instructor?.name?.toLowerCase().includes(search)
    );
  }, [enrollments, searchTerm]);

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Error
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
              {enrollments.length > 0
                ? `${enrollments.length} course${enrollments.length === 1 ? "" : "s"} enrolled`
                : "Start your learning journey"}
            </p>
          </div>
        </div>

        {/* Search and View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              className="border border-gray-200 rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border"}`}
              title="Grid view"
            >
              <Grid3X3 />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border"}`}
              title="List view"
            >
              <List />
            </button>
          </div>
        </div>

        {/* Empty */}
        {filteredEnrollments.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No courses yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven&apos;t enrolled in any courses yet. Discover amazing courses and start learning today!
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <>
            {/* Courses Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "flex flex-col gap-6"
              }
            >
              {filteredEnrollments.map((enrollment) => (
                <CourseEnrolledcard
                  key={enrollment._id}
                  enrollment={enrollment}
                  progress={progresses[enrollment.course._id] || 0}
                  viewMode={viewMode}
                  onContinue={(courseId) => navigate(`/continue/${courseId}`)}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
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
                      {
                        enrollments.filter(
                          (en) => (progresses[en.course._id] || 0) >= 90
                        ).length
                      }
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
                      {new Set(enrollments.map((c) => c.course.instructor?.name)).size}
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
