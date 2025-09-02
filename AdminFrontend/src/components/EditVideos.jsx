import { useState, useEffect } from "react";
import axios from "axios";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import {
  Upload,
  Trash2,
  X,
  Loader2,
  Video,
  PlayCircle,
  AlertCircle,
} from "lucide-react";

export default function EditVideos({ courseId, onClose, onVideosUpdated }) {
  const [videos, setVideos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios
      .get(`${BACK_URL}/api/admin/courses/${courseId}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      })
      .then((res) => setVideos(res.data.videos || []))
      .catch(() => setError("Failed to load videos"));
  }, [courseId]);

  const uploadVideo = async () => {
    if (!newTitle.trim() || !newFile) {
      setError("Title and video file are required");
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

      const res = await axios.get(`${BACK_URL}/api/admin/courses/${courseId}`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setVideos(res.data.videos || []);
      setNewTitle("");
      setNewFile(null);
      setProgress(0);
      onVideosUpdated();
    } catch {
      setError("Failed to upload video");
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (videoId) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await axios.delete(
        `${BACK_URL}/api/admin/courses/${courseId}/videos/${videoId}`,
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      );
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch {
      setError("Failed to delete video");
    }
  };

  return (
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
