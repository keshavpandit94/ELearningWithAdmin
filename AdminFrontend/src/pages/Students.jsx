import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
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
  Loader2,
  AlertCircle,
  ShieldCheck,
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

  // Fetch all students
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

  // Save Student (Add/Update)
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

  // Toggle Suspend Status
  const toggleSuspend = (id, currentStatus) => {
    const action = currentStatus === "active" ? "suspend" : "unsuspend";
    axios.post(`${BACK_URL}/api/admin/users/${id}/${action}`, {}, {
      headers: { "x-admin-token": ADMIN_TOKEN },
    }).then(() => fetchStudents())
    .catch(err => setError("Status update failed."));
  };

  // Delete Student
  const deleteStudent = (id) => {
    if (!window.confirm("Permanent Action: Remove student record?")) return;
    axios.delete(`${BACK_URL}/api/admin/users/${id}`, {
      headers: { "x-admin-token": ADMIN_TOKEN },
    }).then(() => fetchStudents())
    .catch(err => setError("Deletion failed."));
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

      {error && <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-bold text-sm text-center">{error}</div>}

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
              ) : students.length === 0 ? (
                <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">No students found in the system.</td></tr>
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
                          <button onClick={() => setDetailsModal(s)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm" title="View Details">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => openEditModal(s)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm" title="Edit Student">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => toggleSuspend(s._id, status)} className={`p-2.5 rounded-xl bg-white border border-slate-200 transition-all shadow-sm ${
                            status === "active" ? "text-amber-500 hover:bg-amber-500 hover:text-white" : "text-emerald-500 hover:bg-emerald-500 hover:text-white"
                          }`} title={status === "active" ? "Suspend Student" : "Activate Student"}>
                            {status === "active" ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                          </button>
                          <button onClick={() => deleteStudent(s._id)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-rose-400 hover:bg-rose-600 hover:text-white transition-all shadow-sm" title="Delete Permanent">
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

      {/* --- MODALS --- */}
      <AnimatePresence>
        {modalVisible && (
          <Modal title={editingId ? "Update Student" : "New Onboarding"} onClose={closeModal}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" />
              </div>
              <button onClick={handleSave} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all mt-4">
                {editingId ? "SAVE CHANGES" : "PROVISION ACCOUNT"}
              </button>
            </div>
          </Modal>
        )}

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