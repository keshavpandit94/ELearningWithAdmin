import { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
=======
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
  Clock,
  User,
=======
<<<<<<< HEAD
  Clock,
  User,
  ExternalLink,
  ChevronRight
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
} from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [showCreating, setShowCreating] = useState(false);
  const [showEditVideosId, setShowEditVideosId] = useState(null);

<<<<<<< HEAD
  // Fetch courses
=======
<<<<<<< HEAD
=======
  // Fetch courses
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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

<<<<<<< HEAD
  // Delete
  const deleteCourse = async (id) => {
    if (!window.confirm("Permanent Action: Are you sure you want to delete this course?")) return;
=======
<<<<<<< HEAD
  const deleteCourse = async (id) => {
    if (!window.confirm("Permanent Action: Are you sure you want to delete this course?")) return;
=======
  // Delete
  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure to delete this course?")) return;
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    try {
      await axios.delete(`${BACK_URL}/api/admin/courses/${id}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setCourses((prev) => prev.filter((c) => c._id !== id));
<<<<<<< HEAD
      setError("");
=======
<<<<<<< HEAD
=======
      setError("");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    } catch {
      setError("Failed to delete course.");
    }
  };

<<<<<<< HEAD
  // Edit Handlers
  const startEdit = (course) => setEditingCourse(course);
  
=======
<<<<<<< HEAD
  const onEditSave = (updated) => {
    setCourses((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
    setEditingCourse(null);
  };

=======
  // Edit
  const startEdit = (course) => setEditingCourse(course);
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  const onEditSave = (updated) => {
    setCourses((prev) =>
      prev.map((c) => (c._id === updated._id ? updated : c))
    );
    setEditingCourse(null);
  };

<<<<<<< HEAD
=======
  // Create
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  const onCreateSave = (created) => {
    setCourses((prev) => [created, ...prev]);
    setShowCreating(false);
  };

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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

<<<<<<< HEAD
      {/* --- DATA VIEW (Desktop) --- */}
      <div className="hidden md:block bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
=======
      {/* --- DATA VIEW --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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

<<<<<<< HEAD
      {/* --- MOBILE CARDS --- */}
      <div className="grid gap-6 md:hidden">
        {courses.map((c) => (
          <div key={c._id} className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-2">{c.title}</h2>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{c.description}</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">{c.duration}</span>
              {c.isFree ? (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black border border-emerald-100">FREE</span>
              ) : (
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black border border-blue-100">₹{c.discountPrice}</span>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => startEdit(c)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">Edit</button>
              <button onClick={() => setShowEditVideosId(c._id)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all">Videos</button>
              <button onClick={() => deleteCourse(c._id)} className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>

=======
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      {/* --- MODAL WRAPPERS --- */}
      <AnimatePresence>
        {editingCourse && (
          <ModalWrapper onClose={() => setEditingCourse(null)}>
<<<<<<< HEAD
            <EditCourse 
              course={editingCourse} 
              onSave={onEditSave} 
              onCancel={() => setEditingCourse(null)} 
              onClose={() => setEditingCourse(null)} 
            />
=======
            <EditCourse course={editingCourse} onSave={onEditSave} onCancel={() => setEditingCourse(null)} />
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          </ModalWrapper>
        )}
        {showCreating && (
          <ModalWrapper onClose={() => setShowCreating(false)}>
<<<<<<< HEAD
            <CreateCourse 
              onCreated={onCreateSave} 
              onClose={() => setShowCreating(false)} 
            />
=======
            <CreateCourse onCreated={onCreateSave} onClose={() => setShowCreating(false)} />
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          </ModalWrapper>
        )}
        {showEditVideosId && (
          <ModalWrapper onClose={() => setShowEditVideosId(null)}>
<<<<<<< HEAD
            <EditVideos 
              courseId={showEditVideosId} 
              onClose={() => setShowEditVideosId(null)} 
              onVideosUpdated={() => setShowEditVideosId(null)} 
            />
=======
            <EditVideos courseId={showEditVideosId} onClose={() => setShowEditVideosId(null)} onVideosUpdated={() => setShowEditVideosId(null)} />
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
}
=======
}
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
