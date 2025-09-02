import { useState, useEffect } from "react";
import axios from "axios";
import { X, Save, XCircle, Clock, Tag, DollarSign, Type, BookOpen } from "lucide-react"; 
import BACK_URL, { ADMIN_TOKEN } from "../api";

export default function EditCourse({ course, onSave, onCancel, onClose }) {
  const [editFields, setEditFields] = useState({
    title: "",
    description: "",
    duration: "",
    price: 0,
    discountPrice: 0,
    isFree: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (course) {
      setEditFields({
        title: course.title,
        description: course.description,
        duration: course.duration,
        price: course.price,
        discountPrice: course.discountPrice,
        isFree: course.isFree,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${BACK_URL}/api/admin/courses/${course._id}`,
        editFields,
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      );
      onSave(res.data);
      if (onClose) onClose(); 
    } catch {
      setError("❌ Failed to save course.");
    }
  };

  return (
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
