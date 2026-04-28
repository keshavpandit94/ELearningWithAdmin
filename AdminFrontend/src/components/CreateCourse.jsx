import { useState, useRef, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
import { motion, AnimatePresence } from "framer-motion";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import {
  BookOpen,
<<<<<<< HEAD
=======
  PlusCircle,
=======
import BACK_URL, { ADMIN_TOKEN } from "../api";
import {
  BookOpen,
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  FileText,
  Clock,
  DollarSign,
  Tag,
<<<<<<< HEAD
=======
  Image as ImageIcon,
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  User,
<<<<<<< HEAD
  Sparkles,
  UploadCloud,
=======
<<<<<<< HEAD
  Sparkles,
  UploadCloud,
  ChevronRight
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
} from "lucide-react";

export default function CreateCourse({ onCreated, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    price: 0,
    discountPrice: 0,
    isFree: false,
    thumbnail: null,
    instructor: "",
  });
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${BACK_URL}/api/admin/instructors`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => setInstructors(res.data || []))
<<<<<<< HEAD
      .catch(() => setError("System Error: Failed to load faculty records."));
=======
<<<<<<< HEAD
      .catch(() => setError("System Error: Failed to load faculty records."));
=======
      .catch(() => setError("Failed to load instructors"));
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.instructor || !form.thumbnail) {
      setError("Please complete all required fields (Title, Instructor, Thumbnail).");
=======
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  const validateForm = () => {
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.thumbnail ||
      !form.instructor
    ) {
      return "Title, description, thumbnail, and instructor are required";
    }
    if (!form.isFree && form.price <= 0) {
      return "Price must be greater than 0 for paid courses";
    }
<<<<<<< HEAD
    if (!form.isFree && form.discountPrice && Number(form.discountPrice) > Number(form.price)) {
=======
    if (form.discountPrice && form.discountPrice > form.price) {
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      return "Discount price cannot exceed actual price";
    }
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
<<<<<<< HEAD
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
<<<<<<< HEAD
      Object.keys(form).forEach((key) => {
        // Handle boolean and file types correctly for FormData
        formData.append(key, form[key]);
      });
=======
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949

      const res = await axios.post(`${BACK_URL}/api/admin/courses`, formData, {
        headers: {
          "x-admin-token": ADMIN_TOKEN,
          "Content-Type": "multipart/form-data",
        },
      });

      onCreated(res.data);
<<<<<<< HEAD
      setSuccess("Success! Course is now live in the database.");

      // Clear form
=======
<<<<<<< HEAD
      setSuccess("Success! Course is now live in the database.");
      if (onClose) setTimeout(() => onClose(), 1500);
    } catch {
      setError("Critical: Database sync failed. Please try again.");
=======
      setSuccess("Course created successfully!");

>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      setForm({
        title: "",
        description: "",
        duration: "",
        price: 0,
        discountPrice: 0,
        isFree: false,
        thumbnail: null,
        instructor: "",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";

      if (onClose) setTimeout(() => onClose(), 1500);
<<<<<<< HEAD
    } catch (err) {
      setError(err.response?.data?.message || "Critical: Database sync failed.");
=======
    } catch {
      setError("Failed to create course");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center px-4 z-[100] overflow-y-auto py-10"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl p-8 md:p-12 relative border border-white"
      >
<<<<<<< HEAD
=======
        {/* Close Button */}
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-500"
        >
          <X size={24} />
        </button>

        <form onSubmit={submit} className="space-y-8">
<<<<<<< HEAD
=======
          {/* Header */}
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          <header>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Sparkles size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Course Architect</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Draft a New <span className="text-blue-600 italic">Program.</span></h2>
          </header>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex items-center gap-3 text-rose-600 bg-rose-50 border border-rose-100 p-4 rounded-2xl font-bold text-sm">
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex items-center gap-3 text-emerald-600 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl font-bold text-sm">
                <CheckCircle2 size={18} /> {success}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<<<<<<< HEAD
=======
            
            {/* Left Column: Basic Info */}
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Program Title</label>
                <div className="relative group">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input name="title" placeholder="e.g. Advanced UI/UX Principles" value={form.title} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Lead Instructor</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <select name="instructor" value={form.instructor} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-slate-700 appearance-none">
                    <option value="">Select Faculty</option>
                    {instructors.map((inst) => <option key={inst._id} value={inst._id}>{inst.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Curriculum Summary</label>
                <textarea name="description" placeholder="Briefly describe the course objectives..." value={form.description} onChange={handleChange} rows={4} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium resize-none" />
              </div>
            </div>

<<<<<<< HEAD
=======
            {/* Right Column: Pricing & Media */}
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Retail Price</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input name="price" type="number" disabled={form.isFree} value={form.price} onChange={handleChange} className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none transition-all font-black text-slate-700 disabled:opacity-50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Discount Price</label>
                  <div className="relative group">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input name="discountPrice" type="number" disabled={form.isFree} value={form.discountPrice} onChange={handleChange} className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none transition-all font-black text-blue-600 disabled:opacity-50" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-lg ${form.isFree ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                      <Sparkles size={16} />
                   </div>
                   <span className="text-sm font-bold text-slate-700">Open Source (Free)</span>
                </div>
                <input name="isFree" type="checkbox" checked={form.isFree} onChange={handleChange} className="w-5 h-5 accent-blue-600 cursor-pointer" />
              </div>

<<<<<<< HEAD
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Duration</label>
                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input name="duration" placeholder="e.g. 10 hours" value={form.duration} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none transition-all font-medium" />
                </div>
              </div>

=======
              {/* Thumbnail Dropzone */}
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cover Artwork</label>
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="group relative h-40 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all overflow-hidden"
                >
                  {form.thumbnail ? (
<<<<<<< HEAD
                    <img src={URL.createObjectURL(form.thumbnail)} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
=======
                    <img src={URL.createObjectURL(form.thumbnail)} className="absolute inset-0 w-full h-full object-cover" />
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
                  ) : (
                    <>
                      <UploadCloud className="text-slate-300 group-hover:text-blue-500 mb-2 transition-colors" size={32} />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload JPG/PNG</p>
                    </>
                  )}
                  <input ref={fileInputRef} name="thumbnail" type="file" accept="image/*" className="hidden" onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

<<<<<<< HEAD
=======
          {/* Action Footer */}
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4">
             <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-[1.5rem] font-black shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95 disabled:bg-slate-300"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><PlusCircle size={20} /> LAUNCH COURSE</>}
              </button>
              <button type="button" onClick={onClose} className="px-10 py-5 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black hover:bg-slate-200 transition-all">
                DISCARD
              </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
<<<<<<< HEAD
}
=======
}
=======
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <form onSubmit={submit} className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <BookOpen className="w-6 h-6" /> Create New Course
          </h2>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-green-600 bg-green-100 p-3 rounded-lg">
              <CheckCircle2 className="w-5 h-5" /> {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <input
                name="title"
                placeholder="Course Title"
                value={form.title}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-indigo-500" />
              <select
                name="instructor"
                value={form.instructor}
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

            <div className="flex items-start gap-2 border rounded-lg px-3 py-2 md:col-span-2">
              <FileText className="w-5 h-5 text-indigo-500 mt-1" />
              <textarea
                name="description"
                placeholder="Course Description"
                value={form.description}
                onChange={handleChange}
                className="w-full outline-none resize-none"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              <input
                name="duration"
                placeholder="Duration (e.g., 10 hours)"
                value={form.duration}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full outline-none"
                disabled={form.isFree}
              />
            </div>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Tag className="w-5 h-5 text-pink-500" />
              <input
                name="discountPrice"
                type="number"
                placeholder="Discount Price"
                value={form.discountPrice}
                onChange={handleChange}
                className="w-full outline-none"
                disabled={form.isFree}
              />
            </div>

            <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer select-none">
              <input
                name="isFree"
                type="checkbox"
                checked={form.isFree}
                onChange={handleChange}
              />
              Free Course
            </label>

            <div className="flex flex-col gap-2 border rounded-lg px-3 py-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-500" />
                <input
                  ref={fileInputRef}
                  name="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              {form.thumbnail && (
                <img
                  src={URL.createObjectURL(form.thumbnail)}
                  alt="Thumbnail Preview"
                  className="w-32 h-20 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Creating...
              </>
            ) : (
              "Create Course"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
