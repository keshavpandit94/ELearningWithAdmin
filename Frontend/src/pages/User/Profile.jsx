import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Edit3, Save, X, UserCircle2,
  Loader2, GraduationCap, BookOpen, Trash2, AlertTriangle, ShieldCheck
<<<<<<< HEAD
=======
=======
import { 
  User, Mail, Shield, Edit3, Save, X, UserCircle2,
  Loader2, GraduationCap, BookOpen, Trash2, AlertTriangle
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
} from "lucide-react";
import BACK_URL from "../../api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const token = localStorage.getItem("token");

<<<<<<< HEAD
  // Fetch profile from backend
  useEffect(() => {
    if (!token) return;
    axios.get(`${BACK_URL}/api/auth/me`, {
=======
<<<<<<< HEAD
  useEffect(() => {
    if (!token) return;
    axios.get(`${BACK_URL}/api/auth/me`, {
=======
  // Fetch profile from backend
  useEffect(() => {
    if (!token) return;
    axios
      .get(`${BACK_URL}/api/auth/me`, {
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setForm({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          role: res.data.user.role || "student",
        });
      })
<<<<<<< HEAD
      .catch((err) => console.error("Error fetching profile:", err.response?.data || err.message));
=======
<<<<<<< HEAD
      .catch((err) => console.error(err));
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

<<<<<<< HEAD
  // Save updates to backend
  const handleSave = () => {
    axios.put(`${BACK_URL}/api/auth/me`, form, {
=======
  const handleSave = () => {
    axios.put(`${BACK_URL}/api/auth/me`, form, {
=======
      .catch((err) => {
        console.error("Error fetching profile:", err.response?.data || err.message);
      });
  }, [token]);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save updates to backend
  const handleSave = () => {
    axios
      .put(`${BACK_URL}/api/auth/me`, form, {
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.updatedUser);
<<<<<<< HEAD
        setEditMode(false);
      })
      .catch((err) => console.error("Error updating profile:", err.response?.data || err.message));
=======
<<<<<<< HEAD
        setEditMode(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== "DELETE") return;
    axios.delete(`${BACK_URL}/api/auth/me`, {
=======
        // console.log(res.data.updatedUser)
        setEditMode(false);
      })
      .catch((err) => {
        console.error("Error updating profile:", err.response?.data || err.message);
      });
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  };

  // Delete account
  const handleDeleteAccount = () => {
<<<<<<< HEAD
    if (deleteConfirmText !== "DELETE") return;
    axios.delete(`${BACK_URL}/api/auth/me`, {
=======
    if (deleteConfirmText !== "DELETE") {
      alert("Please type 'DELETE' to confirm account deletion");
      return;
    }
    axios
      .delete(`${BACK_URL}/api/auth/me`, {
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("token");
<<<<<<< HEAD
        window.location.href = "/";
      })
      .catch((err) => console.error("Error deleting account:", err.response?.data || err.message));
=======
<<<<<<< HEAD
        window.location.href = "/";
      })
      .catch((err) => console.error(err));
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  };

  if (!user) return (
    <div className="flex items-center justify-center min-h-screen bg-[#fafafa]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-slate-500 font-bold tracking-tight">Syncing profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          
          {/* --- HERO HEADER --- */}
          <div className="bg-slate-900 px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full translate-x-10 -translate-y-10" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-white/10 p-1 rounded-[2rem] backdrop-blur-xl border border-white/20 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-[1.8rem] shadow-xl">
                    <UserCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-black tracking-tighter">Account Center</h2>
              <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                <ShieldCheck size={14} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Secure Profile</span>
<<<<<<< HEAD
=======
=======
        alert("Account deleted successfully");
        window.location.href = "/"; // redirect home or login
      })
      .catch((err) => {
        console.error("Error deleting account:", err.response?.data || err.message);
      });
  };

  // Loading state
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <UserCircle2 className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">My Profile</h2>
                <p className="text-blue-100 mt-1">Manage your account information</p>
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
              </div>
            </div>
          </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          {/* --- BODY --- */}
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {editMode ? (
                /* EDIT MODE */
                <motion.div 
                  key="edit"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <Edit3 size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Update Details</h3>
                  </div>

                  <div className="grid gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Platform Role</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          {form.role === "student" ? <GraduationCap size={20} /> : <BookOpen size={20} />}
                        </div>
                        <select name="role" value={form.role} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-800 appearance-none">
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8">
                    <button onClick={handleSave} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                      <Save size={18} /> Save Changes
                    </button>
                    <button onClick={() => setEditMode(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* DISPLAY MODE */
                <motion.div 
                  key="display"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="grid gap-4">
                    <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600"><User /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                        <p className="text-lg font-bold text-slate-900">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600"><Mail /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                        <p className="text-lg font-bold text-slate-900">{user.email}</p>
                      </div>
                    </div>
<<<<<<< HEAD
                    <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600">
                        {user.role === "student" ? <GraduationCap size={20} /> : <BookOpen size={20} />}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</p>
                        <p className="text-lg font-bold text-slate-900 capitalize">{user.role}</p>
                      </div>
                    </div>
=======
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
                  </div>

                  <button onClick={() => setEditMode(true)} className="w-full py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all duration-300">
                    EDIT PROFILE
                  </button>

                  {/* Danger Zone */}
                  <div className="pt-8 mt-8 border-t border-slate-100">
                    <div className="bg-red-50 rounded-[2rem] p-8 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h4 className="font-black text-red-900 tracking-tight">Danger Zone</h4>
                        <p className="text-xs font-bold text-red-600/70">Permanently remove your account and data.</p>
                      </div>
                      <button onClick={() => setShowDeleteModal(true)} className="px-6 py-3 bg-white text-red-600 border border-red-200 rounded-xl font-bold text-sm shadow-sm hover:bg-red-600 hover:text-white transition-all flex items-center gap-2">
                        <Trash2 size={16} /> Delete Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* --- DELETE MODAL --- */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full p-10 text-center"
            >
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Final Confirmation</h3>
              <p className="text-slate-500 text-sm mb-8">
                This action is permanent. Please type <span className="font-black text-slate-900 italic">DELETE</span> to confirm.
              </p>
              <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl mb-6 text-center font-black tracking-widest placeholder:font-medium placeholder:tracking-normal" placeholder="Type here..." />
              <div className="flex gap-4">
                <button onClick={handleDeleteAccount} disabled={deleteConfirmText !== "DELETE"} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-200 disabled:bg-slate-200 disabled:shadow-none">Confirm</button>
                <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(""); }} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
<<<<<<< HEAD
=======
=======
          {/* Body */}
          <div className="p-8">
            {editMode ? (
              // Edit Mode Form
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  Edit Information
                </h3>

                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg"
                    />
                  </div>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <div className="relative">
                    {form.role === "student" ? (
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    ) : (
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    )}
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                    </select>
                  </div>
                </div>

                {/* Save/Cancel */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg"
                  >
                    <Save className="w-5 h-5 inline" /> Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg"
                  >
                    <X className="w-5 h-5 inline" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display Mode
              <div className="space-y-6">
                {/* Info cards */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg font-semibold">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-6 h-6 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-semibold">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    {user.role === "student" ? (
                      <GraduationCap className="w-6 h-6 text-purple-600" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-lg font-semibold capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg"
                >
                  <Edit3 className="w-5 h-5 inline" /> Edit Profile
                </button>

                {/* Danger Zone */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
                  <h4 className="font-semibold text-red-800 mb-2">Danger Zone</h4>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Account</h3>
              <p className="mb-4 text-gray-600">
                This action <strong>cannot be undone</strong>. Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mb-4"
                placeholder="Type DELETE"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== "DELETE"}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-gray-300"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText("");
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    </div>
  );
};

<<<<<<< HEAD
export default Profile;
=======
<<<<<<< HEAD
export default Profile;
=======
export default Profile;
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
