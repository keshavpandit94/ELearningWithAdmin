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
import {
  Upload,
  Trash2,
  X,
  Loader2,
  Video,
  PlayCircle,
  AlertCircle,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  Film,
  CloudUpload,
  ChevronRight,
  CheckCircle2
<<<<<<< HEAD
=======
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
} from "lucide-react";

export default function EditVideos({ courseId, onClose, onVideosUpdated }) {
  const [videos, setVideos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

<<<<<<< HEAD
  // Fetch current videos
=======
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  useEffect(() => {
    axios
      .get(`${BACK_URL}/api/admin/courses/${courseId}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => setVideos(res.data.videos || []))
<<<<<<< HEAD
      .catch(() => setError("System Error: Failed to fetch curriculum."));
  }, [courseId]);

  // Upload Logic
  const uploadVideo = async () => {
    if (!newTitle.trim() || !newFile) {
      setError("Asset requirements missing (Title & File).");
=======
<<<<<<< HEAD
      .catch(() => setError("System Error: Failed to fetch curriculum."));
=======
      .catch(() => setError("Failed to load videos"));
>>>>>>> 35975c69493032751758ba9568584d2f16146318
  }, [courseId]);

  const uploadVideo = async () => {
    if (!newTitle.trim() || !newFile) {
<<<<<<< HEAD
      setError("Asset requirements missing (Title & File).");
=======
      setError("Title and video file are required");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      return;
    }
    setLoading(true);
    setError("");
    setProgress(0);

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("video", newFile);

    try {
      await axios.post(
        `${BACK_URL}/api/admin/courses/${courseId}/videos`,
        formData,
        {
          headers: {
            "x-admin-token": ADMIN_TOKEN,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              setProgress(percent);
            }
          },
        }
      );

<<<<<<< HEAD
      // Refresh list after upload
=======
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      const res = await axios.get(`${BACK_URL}/api/admin/courses/${courseId}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setVideos(res.data.videos || []);
      setNewTitle("");
      setNewFile(null);
      setProgress(0);
      onVideosUpdated();
    } catch {
<<<<<<< HEAD
      setError("Critical: Upload stream interrupted.");
=======
<<<<<<< HEAD
      setError("Critical: Upload stream interrupted.");
=======
      setError("Failed to upload video");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  // Delete Logic
  const deleteVideo = async (videoId) => {
    if (!window.confirm("Permanent Action: Remove this video from curriculum?")) return;
=======
  const deleteVideo = async (videoId) => {
<<<<<<< HEAD
    if (!window.confirm("Permanent Action: Remove this video from curriculum?")) return;
=======
    if (!window.confirm("Delete this video?")) return;
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    try {
      await axios.delete(
        `${BACK_URL}/api/admin/courses/${courseId}/videos/${videoId}`,
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      );
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch {
<<<<<<< HEAD
      setError("Deletion failed. Sync with database lost.");
=======
<<<<<<< HEAD
      setError("Deletion failed. Sync with database lost.");
=======
      setError("Failed to delete video");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    }
  };

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[110] overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative border border-white overflow-hidden"
      >
        {/* Header Area */}
        <div className="bg-slate-900 px-8 py-10 text-white relative">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-rose-500 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <Film size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Curriculum Lab</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter">Manage <span className="italic text-blue-400">Lessons.</span></h2>
        </div>

        <div className="p-8">
          {error && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-rose-600 mb-6 bg-rose-50 border border-rose-100 p-4 rounded-2xl font-bold text-sm">
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}

          {/* --- UPLOAD ZONE --- */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] mb-8">
            <div className="space-y-4">
              <div className="relative">
                <input
                  placeholder="Lesson Title (e.g. 01. Introduction)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative group">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setNewFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full border-2 border-dashed border-slate-200 rounded-2xl px-5 py-3.5 bg-white flex items-center justify-center gap-3 group-hover:border-blue-300 transition-colors">
                    <CloudUpload className="text-slate-400 group-hover:text-blue-500" size={20} />
                    <span className="text-sm font-bold text-slate-500 truncate">
                      {newFile ? newFile.name : "Select Video File"}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={uploadVideo}
                  disabled={loading}
                  className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:bg-slate-300 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {loading ? "SYCNING..." : "UPLOAD"}
                </motion.button>
              </div>

              {/* Progress Bar */}
              <AnimatePresence>
                {loading && progress > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${progress}%` }} 
                        className="bg-blue-600 h-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-[10px] font-black text-blue-600 tracking-widest">{progress}% UPLOADED</span>
                        <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase animate-pulse">Transferring Data...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* --- LESSON LIST --- */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Current Playlist</h3>
            <AnimatePresence initial={false}>
              {videos.length === 0 ? (
                <div className="text-center py-10 text-slate-400 italic text-sm">Playlist is empty.</div>
              ) : (
                videos.map((video, idx) => (
                  <motion.div
                    key={video._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between bg-white border border-slate-100 p-4 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-4 flex-1 truncate">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
                        <PlayCircle size={20} />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-bold text-slate-900 truncate pr-4">{video.title}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Verified Content Node</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href={video.url} target="_blank" rel="noreferrer" className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                            <ChevronRight size={20} />
                        </a>
                        <button
                          onClick={() => deleteVideo(video._id)}
                          className="p-2.5 rounded-xl text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Synced</span>
            </div>
<<<<<<< HEAD
            <button onClick={onClose} className="text-xs font-bold text-slate-900 hover:underline transition-all">Return to Dashboard</button>
=======
            <button onClick={onClose} className="text-xs font-bold text-slate-900 hover:underline">Return to Dashboard</button>
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        </div>
      </motion.div>
    </motion.div>
  );
<<<<<<< HEAD
}
=======
}
=======
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold flex items-center mb-6 text-indigo-700">
          <Video className="w-6 h-6 mr-2" />
          Edit Videos
        </h2>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 mb-4 bg-red-100 p-2 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Upload Form */}
        <div className="space-y-4 mb-6">
          {/* Title input */}
          <input
            placeholder="Video Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* File input */}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setNewFile(e.target.files[0])}
            className="w-full border rounded-lg px-3 py-2 file:mr-3 file:py-2 file:px-3 
                       file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white 
                       hover:file:bg-indigo-700"
          />

          {/* Upload button */}
          <button
            onClick={uploadVideo}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 
                       text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5 mr-2" />
            )}
            {loading ? "Uploading..." : "Upload"}
          </button>

          {/* Upload Progress Bar */}
          {loading && progress > 0 && (
            <div className="w-full bg-gray-200 rounded-lg h-3 overflow-hidden relative">
              <div
                className="bg-indigo-600 h-3 transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                {progress}%
              </span>
            </div>
          )}
        </div>

        {/* Videos List */}
        <ul className="space-y-4 max-h-60 overflow-y-auto">
          {videos.length === 0 ? (
            <p className="text-gray-500 text-center">No videos uploaded yet.</p>
          ) : (
            videos.map((video) => (
              <li
                key={video._id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <PlayCircle className="w-6 h-6 text-indigo-600" />
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-700 font-medium hover:underline"
                  >
                    {video.title}
                  </a>
                </div>
                <button
                  onClick={() => deleteVideo(video._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
