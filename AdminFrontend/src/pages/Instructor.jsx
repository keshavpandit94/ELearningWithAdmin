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
  PlusCircle,
  X,
  Loader2,
  AlertCircle,
  Camera,
  ChevronRight
} from "lucide-react";
import BACK_URL, { ADMIN_TOKEN } from "../api";

// Modern Glass Modal Wrapper
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
    axios.get(`${BACK_URL}/api/admin/instructors`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => setInstructors(res.data))
      .catch(() => setError("Unable to fetch faculty records."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchInstructors(); }, []);

  // Save Instructor with profile picture upload
  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      setError("Identity and contact details are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (bio) formData.append("bio", bio);
    if (profilePic) formData.append("profilePicture", profilePic);

    const config = { 
      headers: { 
        "x-admin-token": ADMIN_TOKEN, 
        "Content-Type": "multipart/form-data" 
      } 
    };

    const request = editingId 
      ? axios.put(`${BACK_URL}/api/admin/instructors/${editingId}`, formData, config)
      : axios.post(`${BACK_URL}/api/admin/instructors`, formData, config);

    request.then(() => {
        fetchInstructors();
        closeModal();
      })
      .catch((err) => setError(err.response?.data?.message || "Sync failed."));
  };

  // Modal Handlers
  const openAddModal = () => {
    setName(""); setEmail(""); setBio(""); setProfilePic(null); 
    setProfilePicPreview(null); setEditingId(null); setError(""); setModalVisible(true);
  };

  const openEditModal = (inst) => {
    setName(inst.name); setEmail(inst.email); setBio(inst.bio || "");
    setEditingId(inst._id); setProfilePicPreview(inst.profilePicture?.url || null);
    setError(""); setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    setName(""); setEmail(""); setBio(""); setProfilePic(null); setProfilePicPreview(null);
    setError("");
  };

  const deleteInstructor = (id) => {
    if (!window.confirm("Remove instructor from platform faculty?")) return;
    axios.delete(`${BACK_URL}/api/admin/instructors/${id}`, { 
        headers: { "x-admin-token": ADMIN_TOKEN } 
      })
      .then(() => fetchInstructors())
      .catch(() => setError("Deletion failed. Check permissions."));
  };

  return (
    <div className="p-4 md:p-10 bg-[#fafafa] min-h-screen">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Faculty <span className="text-blue-600 italic">Management.</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Onboard and manage course creators.</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all w-full md:w-auto justify-center"
        >
          <PlusCircle size={20} />
          ADD NEW FACULTY
        </motion.button>
      </header>

      {/* --- DATA VIEW --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {["INSTRUCTOR", "BIOGRAPHY", "JOINED", "ACTIONS"].map((head) => (
                  <th key={head} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="4" className="p-10 text-center"><Loader2 className="animate-spin inline text-blue-600" /></td></tr>
              ) : instructors.length === 0 ? (
                <tr><td colSpan="4" className="p-10 text-center text-slate-500 font-medium">No instructors found.</td></tr>
              ) : (
                instructors.map((inst, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                    key={inst._id} className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shadow-inner border border-slate-200">
                          {inst.profilePicture?.url ? (
                            <img src={inst.profilePicture.url} className="w-full h-full object-cover" alt={inst.name} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300"><User /></div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{inst.name}</p>
                          <p className="text-[11px] font-medium text-slate-400 lowercase">{inst.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-slate-500 line-clamp-1 max-w-[200px]">{inst.bio || "No biography provided."}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider italic">
                        {new Date(inst.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal(inst)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteInstructor(inst._id)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-rose-400 hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                          <Trash2 size={16} />
                        </button>
                        <button onClick={() => setDetailsModal(inst)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FORM MODAL --- */}
      <AnimatePresence>
        {modalVisible && (
          <Modal title={editingId ? "Update Faculty" : "New Faculty Member"} onClose={closeModal}>
            <div className="space-y-5">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                    {profilePicPreview ? (
                      <img src={profilePicPreview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <Camera className="text-slate-300" size={32} />
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
                    <PlusCircle size={16} />
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) { 
                        setProfilePic(file); 
                        setProfilePicPreview(URL.createObjectURL(file)); 
                      }
                    }} />
                  </label>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4">Profile Portrait</p>
              </div>

              <div className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" />
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Faculty Biography..." rows={3} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium resize-none" />
              </div>

              {error && <div className="flex items-center gap-2 text-rose-600 text-xs font-bold pl-1"><AlertCircle size={14} />{error}</div>}

              <button onClick={handleSave} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all">
                {editingId ? "SAVE CHANGES" : "ONBOARD INSTRUCTOR"}
              </button>
            </div>
          </Modal>
        )}

        {/* --- DETAILS MODAL --- */}
        {detailsModal && (
          <Modal title="Faculty Profile" onClose={() => setDetailsModal(null)}>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-4 border-white shadow-xl overflow-hidden mb-6">
                <img src={detailsModal.profilePicture?.url || "https://ui-avatars.com/api/?name=" + detailsModal.name} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{detailsModal.name}</h3>
              <p className="text-blue-600 font-bold text-sm mb-6 lowercase">{detailsModal.email}</p>
              
              <div className="w-full bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Biography</p>
                  <p className="text-sm text-slate-700 leading-relaxed italic">"{detailsModal.bio || "No biography provided."}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/50">
                  <Calendar size={14} className="text-slate-400" />
                  <p className="text-xs font-bold text-slate-500">Member since {new Date(detailsModal.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <button onClick={() => setDetailsModal(null)} className="w-full mt-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all">
                CLOSE PROFILE
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}