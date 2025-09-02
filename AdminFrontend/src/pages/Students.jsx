import { useEffect, useState } from "react";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import axios from "axios";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Eye,
  Pencil,
  Trash2,
  PauseCircle,
  PlayCircle,
  PlusCircle,
  X,
} from "lucide-react";

// ✅ Reusable Modal
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative overflow-hidden">
        <div className="flex justify-between items-center border-b px-6 py-3">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModal, setDetailsModal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Fetch all students
  const fetchStudents = () => {
    setLoading(true);
    axios
      .get(`${BACK_URL}/api/admin/users`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch users.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ API Helpers
  const addStudentAPI = (student) =>
    axios
      .post(
        `${BACK_URL}/api/admin/users`,
        { ...student, role: "student" },
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      )
      .then((res) => res.data)
      .catch((err) => ({ error: err.response?.data?.message || err.message }));

  const updateStudentAPI = (id, updates) =>
    axios
      .put(`${BACK_URL}/api/admin/users/${id}`, updates, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => res.data)
      .catch((err) => ({ error: err.response?.data?.message || err.message }));

  const suspendStudentAPI = (id) =>
    axios
      .post(`${BACK_URL}/api/admin/users/${id}/suspend`, {}, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => res.data)
      .catch((err) => ({ error: err.response?.data?.message || err.message }));

  const unsuspendStudentAPI = (id) =>
    axios
      .post(`${BACK_URL}/api/admin/users/${id}/unsuspend`, {}, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => res.data)
      .catch((err) => ({ error: err.response?.data?.message || err.message }));

  const deleteStudentAPI = (id) =>
    axios
      .delete(`${BACK_URL}/api/admin/users/${id}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then(() => ({ success: true }))
      .catch((err) => ({ error: err.response?.data?.message || err.message }));

  // ✅ Modal Handlers
  const openAddModal = () => {
    setName("");
    setEmail("");
    setEditingId(null);
    setError("");
    setModalVisible(true);
  };

  const openEditModal = (id) => {
    const s = students.find((st) => st._id === id);
    if (!s) return;
    setName(s.name);
    setEmail(s.email);
    setEditingId(id);
    setError("");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    setName("");
    setEmail("");
    setError("");
  };

  // ✅ Save Student
  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required");
      return;
    }

    const action = editingId
      ? updateStudentAPI(editingId, { name, email })
      : addStudentAPI({ name, email });

    action.then((data) => {
      if (!data.error) {
        fetchStudents();
        closeModal();
      } else {
        setError(data.error);
      }
    });
  };

  // ✅ Suspend/Unsuspend
  const toggleSuspend = (id, currentStatus) => {
    const action =
      currentStatus === "active"
        ? suspendStudentAPI(id)
        : unsuspendStudentAPI(id);

    action.then((data) => {
      if (!data.error) {
        fetchStudents();
      } else {
        setError(data.error);
      }
    });
  };

  // ✅ Delete
  const deleteStudent = (id) => {
    deleteStudentAPI(id).then((data) => {
      if (!data.error) {
        fetchStudents();
      } else {
        setError(data.error);
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <User className="w-7 h-7 text-blue-600" /> Students
      </h1>

      {error && (
        <p className="text-red-500 mb-4 font-semibold text-sm">{error}</p>
      )}

      <button
        onClick={openAddModal}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-700 transition"
      >
        <PlusCircle className="w-5 h-5" /> Add Student
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-500 text-center">No students found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const isSuspended =
                  s.suspendUntil && new Date(s.suspendUntil) > new Date();
                const status = isSuspended ? "suspended" : "active";
                return (
                  <tr
                    key={s._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-3 text-center flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => setDetailsModal(s)}
                        className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-xs"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button
                        onClick={() => openEditModal(s._id)}
                        className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-xs"
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => toggleSuspend(s._id, status)}
                        className={`flex items-center gap-1 text-white px-3 py-1 rounded transition text-xs ${
                          status === "active"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {status === "active" ? (
                          <>
                            <PauseCircle className="w-4 h-4" /> Suspend
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-4 h-4" /> Activate
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteStudent(s._id)}
                        className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition text-xs"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Add/Edit Modal */}
      {modalVisible && (
        <Modal title={editingId ? "Edit Student" : "Add Student"} onClose={closeModal}>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name"
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Student email"
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
            >
              {editingId ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </Modal>
      )}

      {/* ✅ View Details Modal */}
      {detailsModal && (
        <Modal title="Student Details" onClose={() => setDetailsModal(null)}>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Name:</span> {detailsModal.name}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Email:</span> {detailsModal.email}
            </p>
            <p className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Role:</span> {detailsModal.role}
            </p>
            <p className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Status:</span>{" "}
              {detailsModal.suspendUntil &&
              new Date(detailsModal.suspendUntil) > new Date()
                ? "Suspended"
                : "Active"}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Joined:</span>{" "}
              {detailsModal.createdAt
                ? new Date(detailsModal.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
