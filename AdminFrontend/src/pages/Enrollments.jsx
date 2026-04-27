<<<<<<< HEAD
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
=======
import { useEffect, useState } from "react";
>>>>>>> 35975c69493032751758ba9568584d2f16146318
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
<<<<<<< HEAD
  Mail,
  ShieldCheck,
  Search,
  Filter
} from "lucide-react";

// Modernized Modal Form
=======
} from "lucide-react";

// Reusable modal form component
>>>>>>> 35975c69493032751758ba9568584d2f16146318
function EnrollmentForm({ initialData = {}, onSubmit, onClose }) {
  const [student, setStudent] = useState(initialData.student || "");
  const [course, setCourse] = useState(initialData.course || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!student.trim() || !course.trim()) {
<<<<<<< HEAD
      setError("Please fill in both Student and Course IDs.");
=======
      setError("Student and Course fields are required");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
      return;
    }
    onSubmit({ student, course });
  };

  return (
<<<<<<< HEAD
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md relative p-8 border border-slate-100"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 tracking-tighter">
          <div className="p-2 bg-blue-100 rounded-xl">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          {initialData.student ? "Modify Enrollment" : "New Enrollment"}
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Student Identifier</label>
            <input
              type="text"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              placeholder="Enter User ID"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Course Identifier</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter Course ID"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
            />
          </div>
          
          {error && <p className="text-rose-600 text-xs font-bold pl-1">{error}</p>}

          <button
            onClick={handleSubmit}
            className="mt-4 bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl w-full font-black text-sm shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2"
          >
            {initialData.student ? "UPDATE RECORD" : "PROVISION ACCESS"}
          </button>
        </div>
      </motion.div>
    </motion.div>
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
  );
}

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formInitialData, setFormInitialData] = useState({});

<<<<<<< HEAD
  useEffect(() => { fetchEnrollments(); }, []);

  const fetchEnrollments = async () => {
    setLoading(true);
=======
  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    setLoading(true);
    setError("");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
    try {
      const res = await axios.get(`${BACK_URL}/api/admin/enrollments`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setEnrollments(res.data);
<<<<<<< HEAD
    } catch (err) { setError("Failed to synchronize enrollment records."); }
    setLoading(false);
  };

  const handleFormSubmit = async ({ student, course }) => {
    setLoading(true);
    try {
      const endpoint = editingId ? `${BACK_URL}/admin/enrollments/${editingId}` : `${BACK_URL}/admin/enrollments`;
      const method = editingId ? 'put' : 'post';
      
      const res = await axios[method](endpoint, { student, course }, {
        headers: { "x-admin-token": ADMIN_TOKEN }
      });

      if (editingId) {
        setEnrollments(enrollments.map(e => (e._id === editingId ? res.data : e)));
      } else {
        setEnrollments([...enrollments, res.data]);
      }
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed.");
    } finally { setLoading(false); }
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormInitialData({});
<<<<<<< HEAD
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Revoke access permanently?")) return;
    try {
      await axios.delete(`${BACK_URL}/admin/enrollments/${id}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setEnrollments(enrollments.filter((e) => e._id !== id));
    } catch (err) { setError("Deletion failed."); }
  };

  const getStatusStyle = (status) => {
    const s = status.toLowerCase();
    if (s === 'active' || s === 'enrolled') return "bg-emerald-50 text-emerald-600 border-emerald-100";
    if (s === 'cancelled' || s === 'failed') return "bg-rose-50 text-rose-600 border-rose-100";
    return "bg-slate-50 text-slate-500 border-slate-100";
  };

  return (
    <div className="p-4 md:p-10 bg-[#fafafa] min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            Access <span className="text-blue-600 italic">Control.</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Management of student course provisoning.</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => { setFormInitialData({}); setShowForm(true); }}
          className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all w-full md:w-auto justify-center"
        >
          <PlusCircle size={20} />
          MANUAL ENROLLMENT
        </motion.button>
      </header>

      {error && <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-bold text-sm text-center">{error}</div>}

      {loading && !showForm ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Updating Ledger...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  {["STUDENT", "COURSE", "STATUS", "REFERENCE", "ACTIONS"].map((head) => (
                    <th key={head} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {enrollments.map((e, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                    key={e._id} className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <User size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 leading-tight">{e.student?.name || "Unknown"}</span>
                          <span className="text-[11px] font-medium text-slate-400">{e.student?.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-slate-300" />
                        <span className="text-sm font-bold text-slate-700">{e.course?.title || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(e.status)}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-400 text-xs font-mono">
                      {e.payment ? (
                        <div className="flex items-center gap-2 text-slate-600">
                          <CreditCard size={14} />
                          <span className="font-bold">{e.payment}</span>
                        </div>
                      ) : "Internal Provision"}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        {e.status.toLowerCase() !== "cancelled" && (
                          <>
                            <button 
                              onClick={() => {
                                setFormInitialData({ student: e.student?._id, course: e.course?._id });
                                setEditingId(e._id);
                                setShowForm(true);
                              }}
                              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                            >
                              <Pencil size={14} />
                            </button>
                            <button 
                              onClick={() => handleDelete(e._id)}
                              className="p-2.5 rounded-xl bg-white border border-slate-200 text-rose-400 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <EnrollmentForm
            initialData={formInitialData}
            onSubmit={handleFormSubmit}
            onClose={closeForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
=======
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
                    className={`p-3 font-semibold ${e.status === "active"
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
                    {e.status !== "cancel" && e.status !== "cancelled" && (
                      <button
                        onClick={() => openEditForm(e._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 flex items-center gap-1"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                    {e.status !== "cancel" && e.status !== "cancelled" && (
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    )}
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
