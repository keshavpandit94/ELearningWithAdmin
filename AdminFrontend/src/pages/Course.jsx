import { useState, useEffect } from "react";
import axios from "axios";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import EditVideos from "../components/EditVideos";
import CreateCourse from "../components/CreateCourse";
import EditCourse from "../components/EditCourse";
import {
  Pencil,
  Trash2,
  Film,
  Loader2,
  AlertCircle,
  BookOpen,
  PlusCircle,
} from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [showCreating, setShowCreating] = useState(false);
  const [showEditVideosId, setShowEditVideosId] = useState(null);

  // Fetch courses
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACK_URL}/api/admin/courses`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch courses.");
        setLoading(false);
      });
  }, []);

  // Delete
  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure to delete this course?")) return;
    try {
      await axios.delete(`${BACK_URL}/api/admin/courses/${id}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setCourses((prev) => prev.filter((c) => c._id !== id));
      setError("");
    } catch {
      setError("Failed to delete course.");
    }
  };

  // Edit
  const startEdit = (course) => setEditingCourse(course);
  const onEditSave = (updated) => {
    setCourses((prev) =>
      prev.map((c) => (c._id === updated._id ? updated : c))
    );
    setEditingCourse(null);
  };

  // Create
  const onCreateSave = (created) => {
    setCourses((prev) => [created, ...prev]);
    setShowCreating(false);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="flex items-center text-2xl font-bold text-gray-800">
          <BookOpen className="w-7 h-7 mr-2 text-indigo-600" />
          Courses
        </h1>
        <button
          onClick={() => setShowCreating(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition w-full sm:w-auto justify-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create Course
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-indigo-600 font-medium mb-4">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading courses...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 mb-4 font-medium">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {[
                "Title",
                "Description",
                "Duration",
                "Price",
                "Discount",
                "Free",
                "Instructor",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-5 py-3 font-semibold tracking-wide"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {courses.length === 0 && !loading && (
              <tr>
                <td
                  colSpan="8"
                  className="px-5 py-4 text-center text-gray-500"
                >
                  No courses found
                </td>
              </tr>
            )}
            {courses.map((c) => (
              <tr
                key={c._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-5 py-3 font-medium">{c.title}</td>
                <td className="px-5 py-3 truncate max-w-xs">{c.description}</td>
                <td className="px-5 py-3">{c.duration}</td>
                <td className="px-5 py-3">₹{c.price}</td>
                <td className="px-5 py-3">₹{c.discountPrice}</td>
                <td className="px-5 py-3">
                  {c.isFree ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-gray-600">No</span>
                  )}
                </td>
                <td className="px-5 py-3">{c.instructor?.name || "N/A"}</td>
                <td className="px-5 py-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => startEdit(c)}
                    className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(c._id)}
                    className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                  <button
                    onClick={() => setShowEditVideosId(c._id)}
                    className="flex items-center px-3 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
                  >
                    <Film className="w-4 h-4 mr-1" /> Videos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {courses.map((c) => (
          <div
            key={c._id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold mb-1 text-gray-800">
              {c.title}
            </h2>
            <p className="text-gray-600 text-sm mb-1">{c.description}</p>
            <p className="text-sm">Duration: {c.duration}</p>
            <p className="text-sm">Price: ₹{c.price}</p>
            <p className="text-sm">Discount: ₹{c.discountPrice}</p>
            <p className="text-sm">
              Free:{" "}
              {c.isFree ? (
                <span className="text-green-600 font-semibold">Yes</span>
              ) : (
                "No"
              )}
            </p>
            <p className="text-sm mb-3">
              Instructor: {c.instructor?.name || "N/A"}
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => startEdit(c)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Pencil className="w-4 h-4 mr-1" /> Edit
              </button>
              <button
                onClick={() => deleteCourse(c._id)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </button>
              <button
                onClick={() => setShowEditVideosId(c._id)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
              >
                <Film className="w-4 h-4 mr-1" /> Videos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {editingCourse && (
        <EditCourse
          course={editingCourse}
          onSave={onEditSave}
          onClose={() => setEditingCourse(null)}
          onCancel={() => setEditingCourse(null)}
        />
      )}
      {showCreating && (
        <CreateCourse
          onCreated={onCreateSave}
          onClose={() => setShowCreating(false)}
        />
      )}
      {showEditVideosId && (
        <EditVideos
          courseId={showEditVideosId}
          onClose={() => setShowEditVideosId(null)}
          onVideosUpdated={() => setShowEditVideosId(null)}
        />
      )}
    </div>
  );
}
