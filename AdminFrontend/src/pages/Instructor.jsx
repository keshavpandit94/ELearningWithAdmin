import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Eye,
  Pencil,
  Trash2,
  PlusCircle,
  X,
} from "lucide-react";
import BACK_URL, { ADMIN_TOKEN } from "../api";

// Reusable Modal
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative overflow-hidden">
        <div className="flex justify-between items-center border-b px-6 py-3">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModal, setDetailsModal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  // Fetch all instructors
  const fetchInstructors = () => {
    setLoading(true);
    axios
      .get(`${BACK_URL}/api/admin/instructors`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => {
        setInstructors(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch instructors.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // Add or update instructor API with FormData for file upload
  const addInstructorAPI = (formData) =>
    axios
      .post(`${BACK_URL}/api/admin/instructors`, formData, {
        headers: {
          "x-admin-token": ADMIN_TOKEN,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((err) => ({ error: err.response?.data?.message || err.message }));

  const updateInstructorAPI = (id, formData) =>
    axios
      .put(`${BACK_URL}/api/admin/instructors/${id}`, formData, {
        headers: {
          "x-admin-token": ADMIN_TOKEN,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((err) => ({ error: err.response?.data?.message || err.message }));

  const deleteInstructorAPI = (id) =>
    axios
      .delete(`${BACK_URL}/api/admin/instructors/${id}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then(() => ({ success: true }))
      .catch((err) => ({ error: err.response?.data?.message || err.message }));

  // Modal Handlers
  const openAddModal = () => {
    setName("");
    setEmail("");
    setBio("");
    setProfilePic(null);
    setProfilePicPreview(null);
    setEditingId(null);
    setError("");
    setModalVisible(true);
  };

  const openEditModal = (id) => {
    const inst = instructors.find((i) => i._id === id);
    if (!inst) return;
    setName(inst.name);
    setEmail(inst.email);
    setBio(inst.bio || "");
    setEditingId(id);
    setError("");
    setProfilePic(null);
    setProfilePicPreview(inst.profilePicture?.url || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    setName("");
    setEmail("");
    setBio("");
    setProfilePic(null);
    setProfilePicPreview(null);
    setError("");
  };

  // Handle file input change
  const onProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    } else {
      setProfilePic(null);
      setProfilePicPreview(null);
    }
  };

  // Save Instructor with profile picture upload
  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (bio) formData.append("bio", bio);
    if (profilePic) formData.append("profilePicture", profilePic);

    const action = editingId
      ? updateInstructorAPI(editingId, formData)
      : addInstructorAPI(formData);

    action.then((data) => {
      if (!data.error) {
        fetchInstructors();
        closeModal();
      } else {
        setError(data.error);
      }
    });
  };

  // Delete instructor
  const deleteInstructor = (id) => {
    if (!window.confirm("Are you sure to delete this instructor?")) return;
    deleteInstructorAPI(id).then((data) => {
      if (!data.error) {
        fetchInstructors();
      } else {
        setError(data.error);
      }
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900 flex items-center gap-2">
        <User className="w-7 h-7 text-indigo-700" /> Instructors
      </h1>

      {error && <p className="text-red-500 mb-4 font-semibold text-sm">{error}</p>}

      <button
        onClick={openAddModal}
        className="flex items-center gap-2 bg-indigo-700 text-white px-4 py-2 rounded-lg mb-6 hover:bg-indigo-800 transition"
      >
        <PlusCircle className="w-5 h-5" /> Add Instructor
      </button>

      {loading ? (
        <p className="text-center text-indigo-700">Loading instructors...</p>
      ) : instructors.length === 0 ? (
        <p className="text-indigo-700 text-center">No instructors found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-indigo-300">
          <table className="w-full text-sm text-indigo-900">
            <thead className="bg-indigo-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Bio</th>
                <th className="p-3 text-left">Profile Pic</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-200">
              {instructors.map((inst) => (
                <tr key={inst._id} className="hover:bg-indigo-50">
                  <td className="p-3">{inst.name}</td>
                  <td className="p-3 break-all">{inst.email}</td>
                  <td className="p-3 truncate max-w-xs" title={inst.bio || ""}>
                    {inst.bio || "-"}
                  </td>
                  <td className="p-3">
                    {inst.profilePicture?.url ? (
                      <img
                        src={inst.profilePicture.url}
                        alt={inst.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => openEditModal(inst._id)}
                      title="Edit"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteInstructor(inst._id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => setDetailsModal(inst)}
                      title="Details"
                      className="text-indigo-700 hover:text-indigo-900"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalVisible && (
        <Modal title={editingId ? "Edit Instructor" : "Add Instructor"} onClose={closeModal}>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border border-indigo-300 p-2 rounded w-full focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border border-indigo-300 p-2 rounded w-full focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio (optional)"
              rows={3}
              className="border border-indigo-300 p-2 rounded w-full focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-1">Profile Picture (optional):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfilePic(file);
                    setProfilePicPreview(URL.createObjectURL(file));
                  } else {
                    setProfilePic(null);
                    setProfilePicPreview(null);
                  }
                }}
                className="block text-indigo-700"
              />
              {profilePicPreview && (
                <img
                  src={profilePicPreview}
                  alt="Preview"
                  className="mt-3 h-24 w-24 object-cover rounded-full border border-indigo-300 shadow-sm"
                />
              )}
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              onClick={handleSave}
              className="bg-indigo-700 text-white px-4 py-2 rounded w-full hover:bg-indigo-800 transition"
            >
              {editingId ? "Save Changes" : "Add Instructor"}
            </button>
          </div>
        </Modal>
      )}

      {/* Details Modal */}
      {detailsModal && (
        <Modal title="Instructor Details" onClose={() => setDetailsModal(null)}>
          <div className="space-y-3 text-indigo-900 text-sm">
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-700" /> <strong>Name:</strong> {detailsModal.name}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-700" /> <strong>Email:</strong> {detailsModal.email}
            </p>
            <p className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-700" /> <strong>Bio:</strong> {detailsModal.bio || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-700" />{" "}
              <strong>Joined:</strong>{" "}
              {detailsModal.createdAt ? new Date(detailsModal.createdAt).toLocaleString() : "N/A"}
            </p>
            {detailsModal.profilePicture?.url && (
              <img
                src={detailsModal.profilePicture.url}
                alt={detailsModal.name}
                className="w-24 h-24 rounded-full object-cover mt-3"
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
