import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BookOpen,
  Search,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";
import useEnroll from "../../hooks/useEnroll";
import BACK_URL from "../../api";
import CardComponents from "../../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { enroll, isLoading: enrolling } = useEnroll({ token });

  // Fetch courses and enrollments (if logged in)
  useEffect(() => {
    setLoading(true);
    // Fetch courses (public, no auth required)
    axios
      .get(`${BACK_URL}/api/courses`)
      .then((res) => {
        setCourses(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        alert("Unable to load courses. Please try again.");
      })
      .finally(() => setLoading(false));

    // If logged in, fetch enrolled courses
    if (token) {
      axios
        .get(`${BACK_URL}/api/enrollments/my-courses`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setEnrolledCourses(res.data || []))
        .catch((err) =>
          console.error("Failed to load enrollments:", err)
        );
    } else {
      setEnrolledCourses([]);
    }
  }, [token]);

  // Get enrollment status for each course
  const getEnrollmentStatus = (courseId) => {
    const record = enrolledCourses.find(
      (ec) => ec.course?._id === courseId
    );
    return record ? record.status : null; // enrolled | pending | null
  };

  // Filter courses by search term
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Navigate to course details (no login required)
  const openCourseDetails = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                All Courses
              </h2>
              <p className="text-gray-600 mt-1">
                Discover and enroll in amazing courses
              </p>
            </div>
          </div>
        </div>

        {/* Search + View mode */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-600">Loading courses...</p>
          </div>
        )}

        {/* Courses List */}
        {!loading && filteredCourses.length > 0 && (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-4"
            }
          >
            {filteredCourses.map((c) => {
              const status = getEnrollmentStatus(c._id);

              return (
                <CardComponents
                  key={c._id}
                  course={c}
                  status={status}
                  enrolling={enrolling}
                  enroll={enroll}
                  // Pass a custom navigate function to open details page regardless of login
                  navigate={() => openCourseDetails(c._id)}
                  viewMode={viewMode}
                />
              );
            })}
          </div>
        )}

        {/* No courses matching */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            No courses found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
