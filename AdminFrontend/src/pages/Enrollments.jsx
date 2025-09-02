import { useEffect, useState } from "react";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import axios from "axios";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Loader2,
  X,
  BookOpen,
  User,
  CreditCard,
  GraduationCap,
} from "lucide-react";

// Reusable modal form component
function EnrollmentForm({ initialData = {}, onSubmit, onClose }) {
  const [student, setStudent] = useState(initialData.student || "");
  const [course, setCourse] = useState(initialData.course || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!student.trim() || !course.trim()) {
      setError("Student and Course fields are required");
      return;
    }
    onSubmit({ student, course });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          Enrollment Form
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          placeholder="Student ID or name"
          className="border p-2 rounded-lg w-full mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course ID or title"
          className="border p-2 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full font-semibold flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Submit
        </button>
      </div>
    </div>
  );
}

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formInitialData, setFormInitialData] = useState({});

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BACK_URL}/api/admin/enrollments`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setEnrollments(res.data);
    } catch (err) {
      setError("Unable to fetch enrollments.");
    }
    setLoading(false);
  };

  const addEnrollmentAPI = async ({ student, course }) => {
    try {
      const res = await axios.post(
        `${BACK_URL}/admin/enrollments`,
        { student, course },
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      );
      return res.data;
    } catch (err) {
      return { error: err.response?.data?.message || err.message };
    }
  };

  const updateEnrollmentAPI = async (id, updates) => {
    try {
      const res = await axios.put(
        `${BACK_URL}/admin/enrollments/${id}`,
        updates,
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      );
      return res.data;
    } catch (err) {
      return { error: err.response?.data?.message || err.message };
    }
  };

  const deleteEnrollmentAPI = async (id) => {
    try {
      await axios.delete(`${BACK_URL}/admin/enrollments/${id}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      return { success: true };
    } catch (err) {
      return { error: err.response?.data?.message || err.message };
    }
  };

  const openCreateForm = () => {
    setFormInitialData({});
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (id) => {
    const enrollment = enrollments.find((e) => e._id === id);
    if (!enrollment) return;
    setFormInitialData({
      student: enrollment.student._id || enrollment.student,
      course: enrollment.course._id || enrollment.course,
    });
    setEditingId(id);
    setShowForm(true);
    setError("");
  };

  const handleFormSubmit = async ({ student, course }) => {
    if (editingId) {
      const data = await updateEnrollmentAPI(editingId, { student, course });
      if (!data.error) {
        setEnrollments(
          enrollments.map((e) => (e._id === editingId ? data : e))
        );
        closeForm();
      } else {
        setError(data.error);
      }
    } else {
      const data = await addEnrollmentAPI({ student, course });
      if (!data.error) {
        setEnrollments([...enrollments, data]);
        closeForm();
      } else {
        setError(data.error);
      }
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormInitialData({});
    setError("");
  };

  const handleDelete = async (id) => {
    const data = await deleteEnrollmentAPI(id);
    if (!data.error) {
      setEnrollments(enrollments.filter((e) => e._id !== id));
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="w-7 h-7 text-blue-600" />
        Enrollments
      </h1>

      {error && (
        <p className="text-red-500 mb-4 font-semibold text-center">{error}</p>
      )}

      <button
        onClick={openCreateForm}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-700 flex items-center gap-2"
      >
        <PlusCircle className="w-5 h-5" />
        Add Enrollment
      </button>

      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : enrollments.length === 0 ? (
        <p className="text-gray-500 text-center">No enrollments found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden text-sm">
            <thead className="bg-gray-100 border-b text-gray-700">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e) => (
                <tr key={e._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex flex-col">
                      <span className="font-semibold flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        {e.student?.name || "N/A"}
                      </span>
                      <small className="text-gray-500">{e.student?.email}</small>
                    </div>
                  </td>
                  <td className="p-3">{e.course?.title || "N/A"}</td>
                  <td
                    className={`p-3 font-semibold ${
                      e.status === "active"
                        ? "text-green-600"
                        : e.status === "cancelled"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                  </td>
                  <td className="p-3">
                    {e.payment ? (
                      <span className="flex items-center gap-2 text-gray-700">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        {e.payment}
                      </span>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="p-3 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => openEditForm(e._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 flex items-center gap-1"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <EnrollmentForm
          initialData={formInitialData}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
