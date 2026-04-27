import { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Save, XCircle, Clock, Tag, DollarSign, 
  Type, BookOpen, User, Users, AlertCircle, Sparkles 
} from "lucide-react"; 
=======
import { X, Save, XCircle, Clock, Tag, DollarSign, Type, BookOpen, User, Users } from "lucide-react"; 
>>>>>>> 35975c69493032751758ba9568584d2f16146318
import BACK_URL, { ADMIN_TOKEN } from "../api";

export default function EditCourse({ course, onSave, onCancel, onClose }) {
  const [editFields, setEditFields] = useState({
    title: "",
    description: "",
    duration: "",
    price: 0,
    discountPrice: 0,
    isFree: false,
<<<<<<< HEAD
    instructor: "",
  });
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
=======
    instructor: "", // will hold instructor id
  });
  const [instructors, setInstructors] = useState([]); // all instructors to choose from
  const [error, setError] = useState("");
>>>>>>> 35975c69493032751758ba9568584d2f16146318

  useEffect(() => {
    if (course) {
      setEditFields({
<<<<<<< HEAD
        title: course.title || "",
        description: course.description || "",
        duration: course.duration || "",
        price: course.price || 0,
        discountPrice: course.discountPrice || 0,
        isFree: course.isFree || false,
        instructor: course.instructor?._id || "",
=======
        title: course.title,
        description: course.description,
        duration: course.duration,
        price: course.price,
        discountPrice: course.discountPrice,
        isFree: course.isFree,
        instructor: course.instructor?._id || "", // expect populated instructor object
>>>>>>> 35975c69493032751758ba9568584d2f16146318
      });
    }
  }, [course]);

<<<<<<< HEAD
=======
  // Fetch instructors for dropdown on mount
>>>>>>> 35975c69493032751758ba9568584d2f16146318
  useEffect(() => {
    axios
      .get(`${BACK_URL}/api/admin/instructors`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
<<<<<<< HEAD
      .then((res) => setInstructors(res.data || []))
      .catch(() => setError("System Error: Failed to load faculty records."));
=======
      .then((res) => setInstructors(res.data))
      .catch(() => {
        setError("Failed to load instructors");
      });
>>>>>>> 35975c69493032751758ba9568584d2f16146318
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
<<<<<<< HEAD
    if (!editFields.instructor) {
      setError("Faculty assignment is required.");
      return;
    }
    setLoading(true);
    try {
=======
    try {
      if (!editFields.instructor) {
        setError("Instructor is required.");
        return;
      }
>>>>>>> 35975c69493032751758ba9568584d2f16146318
      const res = await axios.put(
        `${BACK_URL}/api/admin/courses/${course._id}`,
        editFields,
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      );
      onSave(res.data);
      if (onClose) onClose();
    } catch {
<<<<<<< HEAD
      setError("Critical: Database sync failed.");
    } finally {
      setLoading(false);
=======
      setError("❌ Failed to save course.");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
    }
  };

  return (
<<<<<<< HEAD
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-[100] bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-white"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-500"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Sparkles size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Course Editor</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            Update <span className="text-blue-600 italic">Curriculum.</span>
          </h2>
        </header>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              className="mb-6 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3"
            >
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Program Title</label>
            <div className="relative group">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                name="title"
                value={editFields.title}
                onChange={handleChange}
                placeholder="Course Title"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Course Bio</label>
            <textarea
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium resize-none"
              name="description"
              rows={3}
              value={editFields.description}
              onChange={handleChange}
              placeholder="Course Description"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Duration</label>
            <div className="relative group">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none transition-all font-medium"
                name="duration"
                value={editFields.duration}
                onChange={handleChange}
                placeholder="e.g. 12 Hours"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Faculty</label>
            <div className="relative group">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                name="instructor"
                value={editFields.instructor}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none"
              >
                <option value="">Select Instructor</option>
                {instructors.map((inst) => (
                  <option key={inst._id} value={inst._id}>{inst.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Retail Price</label>
            <div className="relative group">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="number"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none transition-all font-black text-slate-700 disabled:opacity-50"
                name="price"
                value={editFields.price}
                onChange={handleChange}
                disabled={editFields.isFree}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Discounted Rate</label>
            <div className="relative group">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="number"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none transition-all font-black text-blue-600 disabled:opacity-50"
                name="discountPrice"
                value={editFields.discountPrice}
                onChange={handleChange}
                disabled={editFields.isFree}
              />
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${editFields.isFree ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                   <Sparkles size={16} />
                </div>
                <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">Public Access (Free)</span>
             </div>
             <input
                type="checkbox"
                className="w-6 h-6 accent-blue-600 cursor-pointer"
                name="isFree"
                checked={editFields.isFree}
                onChange={handleChange}
              />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-[1.5rem] font-black shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all disabled:bg-slate-300"
          >
            <Save size={20} /> {loading ? "SYNCING..." : "PUBLISH UPDATES"}
          </motion.button>
          <button
            onClick={onCancel}
            className="px-10 py-5 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black hover:bg-slate-200 transition-all"
          >
            DISCARD
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
=======
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
          <BookOpen className="w-6 h-6 text-indigo-600" /> Edit Course
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-100 p-2 rounded-lg flex items-center gap-2">
            <XCircle className="w-4 h-4" /> {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Type className="w-4 h-4 text-gray-400" />
            <input
              className="w-full outline-none"
              name="title"
              value={editFields.title}
              onChange={handleChange}
              placeholder="Course Title"
              />
          </div>

          <textarea
            className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-200"
            name="description"
            value={editFields.description}
            onChange={handleChange}
            placeholder="Course Description"
          />

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <input
              className="w-full outline-none"
              name="duration"
              value={editFields.duration}
              onChange={handleChange}
              placeholder="Duration (e.g., 10 hours)"
            />
          </div>

          {/* Instructor Dropdown */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Users className="w-4 h-4 text-gray-400" />
            <select
              name="instructor"
              value={editFields.instructor}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            >
              <option value="">Select Instructor</option>
              {instructors.map((inst) => (
                <option key={inst._id} value={inst._id}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <input
              type="number"
              className="w-full outline-none"
              name="price"
              value={editFields.price}
              onChange={handleChange}
              placeholder="Price"
              disabled={editFields.isFree}
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <input
              type="number"
              className="w-full outline-none"
              name="discountPrice"
              value={editFields.discountPrice}
              onChange={handleChange}
              placeholder="Discount Price"
              disabled={editFields.isFree}
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600"
              name="isFree"
              checked={editFields.isFree}
              onChange={handleChange}
            />
            <span className="text-gray-700">Free Course</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
          >
            <Save className="w-4 h-4" /> Save
          </button>
          <button
            onClick={onCancel}
            className="flex items-center justify-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition w-full sm:w-auto"
          >
            <XCircle className="w-4 h-4" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
