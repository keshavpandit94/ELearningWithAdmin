import { useEffect, useState } from "react";
<<<<<<< HEAD
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
=======
import BACK_URL, { ADMIN_TOKEN } from "../api";
import axios from "axios";
>>>>>>> 35975c69493032751758ba9568584d2f16146318
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
<<<<<<< HEAD
  Loader2,
  AlertCircle,
  ShieldCheck,
  Search
} from "lucide-react";
import BACK_URL, { ADMIN_TOKEN } from "../api";

// Modern Glass Modal
function Modal({ title, children, onClose }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md relative overflow-hidden border border-slate-100"
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-50">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </motion.div>
    </motion.div>
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
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

<<<<<<< HEAD
  const fetchStudents = () => {
    setLoading(true);
    axios.get(`${BACK_URL}/api/admin/users`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => setStudents(res.data))
      .catch(() => setError("Critical: Could not sync student database."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      setError("Identity requirements missing (Name/Email).");
      return;
    }
    const config = { headers: { "x-admin-token": ADMIN_TOKEN } };
    const payload = { name, email, role: "student" };
    
    const request = editingId 
      ? axios.put(`${BACK_URL}/api/admin/users/${editingId}`, payload, config)
      : axios.post(`${BACK_URL}/api/admin/users`, payload, config);

    request.then(() => {
      fetchStudents();
      closeModal();
    }).catch(err => setError(err.response?.data?.message || "Sync failed."));
  };

  const toggleSuspend = (id, currentStatus) => {
    const action = currentStatus === "active" ? "suspend" : "unsuspend";
    axios.post(`${BACK_URL}/api/admin/users/${id}/${action}`, {}, {
      headers: { "x-admin-token": ADMIN_TOKEN },
    }).then(() => fetchStudents());
  };

  const deleteStudent = (id) => {
    if (!window.confirm("Permanent Action: Remove student record?")) return;
    axios.delete(`${BACK_URL}/api/admin/users/${id}`, {
      headers: { "x-admin-token": ADMIN_TOKEN },
    }).then(() => fetchStudents());
  };

  const openAddModal = () => {
    setName(""); setEmail(""); setEditingId(null); setError(""); setModalVisible(true);
  };

  const openEditModal = (s) => {
    setName(s.name); setEmail(s.email); setEditingId(s._id); setError(""); setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <div className="p-4 md:p-10 bg-[#fafafa] min-h-screen">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            Student <span className="text-blue-600 italic">Directory.</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Audit and manage global student accounts.</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all w-full md:w-auto justify-center"
        >
          <PlusCircle size={20} />
          ONBOARD STUDENT
        </motion.button>
      </header>

      {/* --- DATA VIEW --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {["IDENTIFIER", "CONTACT", "STATUS", "ACTIONS"].map((head) => (
                  <th key={head} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="4" className="p-10 text-center"><Loader2 className="animate-spin inline text-blue-600" /></td></tr>
              ) : (
                students.map((s, idx) => {
                  const isSuspended = s.suspendUntil && new Date(s.suspendUntil) > new Date();
                  const status = isSuspended ? "suspended" : "active";
                  return (
                    <motion.tr 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}
                      key={s._id} className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <User size={18} />
                          </div>
                          <span className="font-bold text-slate-900 leading-tight">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-500 font-medium">{s.email}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          status === "active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setDetailsModal(s)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => openEditModal(s)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => toggleSuspend(s._id, status)} className={`p-2.5 rounded-xl bg-white border border-slate-200 transition-all shadow-sm ${
                            status === "active" ? "text-amber-500 hover:bg-amber-500 hover:text-white" : "text-emerald-500 hover:bg-emerald-500 hover:text-white"
                          }`}>
                            {status === "active" ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                          </button>
                          <button onClick={() => deleteStudent(s._id)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-rose-400 hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FORM MODAL --- */}
      <AnimatePresence>
        {modalVisible && (
          <Modal title={editingId ? "Update Student" : "New Enrollment"} onClose={closeModal}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" />
              </div>
              {error && <div className="flex items-center gap-2 text-rose-600 text-xs font-bold pl-1"><AlertCircle size={14} />{error}</div>}
              <button onClick={handleSave} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all mt-4">
                {editingId ? "SAVE CHANGES" : "PROVISION ACCOUNT"}
              </button>
            </div>
          </Modal>
        )}

        {/* --- DETAILS MODAL --- */}
        {detailsModal && (
          <Modal title="Student Record" onClose={() => setDetailsModal(null)}>
            <div className="space-y-6">
               <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg"><User size={32} /></div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{detailsModal.name}</h3>
                    <p className="text-sm font-bold text-blue-600 lowercase">{detailsModal.email}</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Access Level</p>
                    <div className="flex items-center gap-2 text-slate-700 font-bold uppercase text-xs"><ShieldCheck size={14} className="text-emerald-500" /> {detailsModal.role}</div>
                  </div>
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Joined Date</p>
                    <div className="flex items-center gap-2 text-slate-700 font-bold uppercase text-xs"><Calendar size={14} className="text-blue-500" /> {new Date(detailsModal.createdAt).toLocaleDateString()}</div>
                  </div>
               </div>

               <button onClick={() => setDetailsModal(null)} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all">
                  DISMISS
               </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
