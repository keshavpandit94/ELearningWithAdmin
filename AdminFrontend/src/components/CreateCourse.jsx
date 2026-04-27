import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import {
  BookOpen,
  PlusCircle,
  FileText,
  Clock,
  DollarSign,
  Tag,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  User,
  Sparkles,
  UploadCloud,
  ChevronRight
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
      .catch(() => setError("System Error: Failed to load faculty records."));
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

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.instructor || !form.thumbnail) {
      setError("Please complete all required fields (Title, Instructor, Thumbnail).");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      const res = await axios.post(`${BACK_URL}/api/admin/courses`, formData, {
        headers: {
          "x-admin-token": ADMIN_TOKEN,
          "Content-Type": "multipart/form-data",
        },
      });

      onCreated(res.data);
      setSuccess("Success! Course is now live in the database.");
      if (onClose) setTimeout(() => onClose(), 1500);
    } catch {
      setError("Critical: Database sync failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center px-4 z-[100] overflow-y-auto py-10"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl p-8 md:p-12 relative border border-white"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-rose-500"
        >
          <X size={24} />
        </button>

        <form onSubmit={submit} className="space-y-8">
          {/* Header */}
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
            
            {/* Left Column: Basic Info */}
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

            {/* Right Column: Pricing & Media */}
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

              {/* Thumbnail Dropzone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cover Artwork</label>
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="group relative h-40 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all overflow-hidden"
                >
                  {form.thumbnail ? (
                    <img src={URL.createObjectURL(form.thumbnail)} className="absolute inset-0 w-full h-full object-cover" />
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

          {/* Action Footer */}
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
}