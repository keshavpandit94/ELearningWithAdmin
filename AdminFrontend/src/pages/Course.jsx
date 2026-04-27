import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
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
  Clock,
  User,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [showCreating, setShowCreating] = useState(false);
  const [showEditVideosId, setShowEditVideosId] = useState(null);

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

  const deleteCourse = async (id) => {
    if (!window.confirm("Permanent Action: Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`${BACK_URL}/api/admin/courses/${id}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch {
      setError("Failed to delete course.");
    }
  };

  const onEditSave = (updated) => {
    setCourses((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
    setEditingCourse(null);
  };

  const onCreateSave = (created) => {
    setCourses((prev) => [created, ...prev]);
    setShowCreating(false);
  };

  return (
    <div className="p-4 md:p-10 bg-[#fafafa] min-h-screen">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            Course <span className="text-blue-600 italic">Inventory.</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage and curate your educational content.</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreating(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all w-full md:w-auto justify-center"
        >
          <PlusCircle size={20} />
          CREATE NEW COURSE
        </motion.button>
      </header>

      {/* --- FEEDBACK STATES --- */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-blue-600 font-bold mb-8">
            <Loader2 className="animate-spin" />
            <span className="uppercase tracking-widest text-[10px]">Syncing Database...</span>
          </motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl mb-8 font-bold text-sm">
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DATA VIEW --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {["COURSE DETAILS", "DURATION", "PRICING", "INSTRUCTOR", "ACTIONS"].map((head) => (
                  <th key={head} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {courses.length === 0 && !loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-medium italic">
                    The inventory is currently empty.
                  </td>
                </tr>
              ) : (
                courses.map((c, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: idx * 0.05 }}
                    key={c._id} 
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{c.title}</span>
                        <span className="text-xs text-slate-400 line-clamp-1 mt-1 max-w-[250px]">{c.description}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-600 text-sm font-bold">
                        <Clock size={14} className="text-slate-300" />
                        {c.duration}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        {c.isFree ? (
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black w-fit border border-emerald-100">FREE</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900 italic">₹{c.discountPrice}</span>
                            <span className="text-[10px] text-slate-300 line-through">₹{c.price}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <User size={14} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{c.instructor?.name || "Unassigned"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <button onClick={() => startEdit(c)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm" title="Edit Info">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => setShowEditVideosId(c._id)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm" title="Manage Videos">
                          <Film size={16} />
                        </button>
                        <button onClick={() => deleteCourse(c._id)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-rose-400 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all shadow-sm" title="Delete Course">
                          <Trash2 size={16} />
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

      {/* --- MODAL WRAPPERS --- */}
      <AnimatePresence>
        {editingCourse && (
          <ModalWrapper onClose={() => setEditingCourse(null)}>
            <EditCourse course={editingCourse} onSave={onEditSave} onCancel={() => setEditingCourse(null)} />
          </ModalWrapper>
        )}
        {showCreating && (
          <ModalWrapper onClose={() => setShowCreating(false)}>
            <CreateCourse onCreated={onCreateSave} onClose={() => setShowCreating(false)} />
          </ModalWrapper>
        )}
        {showEditVideosId && (
          <ModalWrapper onClose={() => setShowEditVideosId(null)}>
            <EditVideos courseId={showEditVideosId} onClose={() => setShowEditVideosId(null)} onVideosUpdated={() => setShowEditVideosId(null)} />
          </ModalWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable Modal Background for Admin Consistency
function ModalWrapper({ children, onClose }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl relative">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}