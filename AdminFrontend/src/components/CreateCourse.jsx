import { useState, useRef } from "react";
import axios from "axios";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import {
  BookOpen,
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

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

  const validateForm = () => {
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.thumbnail ||
      !form.instructor.trim()
    ) {
      return "Title, description, thumbnail, and instructor name are required";
    }
    if (!form.isFree && form.price <= 0) {
      return "Price must be greater than 0 for paid courses";
    }
    if (form.discountPrice && form.discountPrice > form.price) {
      return "Discount price cannot exceed actual price";
    }
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
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
        },
      });

      onCreated(res.data);
      setSuccess("Course created successfully!");

      // Reset form
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

      // Auto close after success
      if (onClose) {
        setTimeout(() => onClose(), 1500);
      }
    } catch {
      setError("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative animate-fadeIn">
        {/* Close button */}
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

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
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
            {/* Instructor */}
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-indigo-500" />
              <input
                name="instructor"
                placeholder="Instructor Name"
                value={form.instructor}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
            {/* Description */}
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
            {/* Duration */}
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
            {/* Price */}
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
            {/* Discount */}
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
            {/* Free */}
            <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer select-none">
              <input
                name="isFree"
                type="checkbox"
                checked={form.isFree}
                onChange={handleChange}
              />
              Free Course
            </label>
            {/* Thumbnail */}
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

          {/* Submit */}
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
