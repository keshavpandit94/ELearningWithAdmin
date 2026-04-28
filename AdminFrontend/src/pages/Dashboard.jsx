import { useEffect, useState } from "react";
<<<<<<< HEAD
import { 
  BookOpen, Users, DollarSign, GraduationCap, X, 
  ArrowUpRight, ArrowRight, User, Loader2, Sparkles
=======
<<<<<<< HEAD
import { 
  BookOpen, Users, DollarSign, GraduationCap, X, 
  ArrowUpRight, TrendingUp, Calendar, ArrowRight, CreditCard, User, Loader2
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import axios from "axios";

// Modern Glass Modal
function Modal({ title, children, onClose }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 relative border border-slate-100"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors">
          <X className="w-5 h-5 text-slate-400" />
        </button>
        <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{title}</h2>
        {children}
      </motion.div>
    </motion.div>
<<<<<<< HEAD
=======
=======
import { BookOpen, Users, DollarSign, GraduationCap, X } from "lucide-react";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import axios from "axios";

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  );
}

export default function Dashboard() {
<<<<<<< HEAD
  const [stats, setStats] = useState({ courses: 0, students: 0, revenue: 0, enrollments: 0 });
=======
<<<<<<< HEAD
  const [stats, setStats] = useState({ courses: 0, students: 0, revenue: 0, enrollments: 0 });
=======
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    revenue: 0,
    enrollments: 0,
  });
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [detailsModal, setDetailsModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      case "success": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "failed": return "bg-rose-50 text-rose-600 border-rose-100";
      case "pending": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
<<<<<<< HEAD
=======
=======
      case "success":
        return "bg-green-100 text-green-600";
      case "failed":
        return "bg-red-100 text-red-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        const headers = { "x-admin-token": ADMIN_TOKEN };
        const [coursesRes, studentsRes, enrollmentsRes, transactionsRes] = await Promise.all([
          axios.get(`${BACK_URL}/api/admin/courses`, { headers }),
          axios.get(`${BACK_URL}/api/admin/users`, { headers }),
          axios.get(`${BACK_URL}/api/admin/enrollments`, { headers }),
          axios.get(`${BACK_URL}/api/admin/payments`, { headers }),
        ]);

        const courses = coursesRes.data || [];
        const enrollments = enrollmentsRes.data || [];
        const transactions = transactionsRes.data || [];

        const coursesWithCounts = courses.map((course) => ({
          ...course,
          studentsCount: enrollments.filter(enr => (enr.course?._id || enr.course) === (course._id || course.id)).length
        }));

        const totalRevenue = transactions.reduce((sum, tx) => tx.status === "success" ? sum + (tx.amount || 0) : sum, 0);

        setStats({
          courses: courses.length,
          students: studentsRes.data?.length || 0,
<<<<<<< HEAD
=======
=======
        const [coursesRes, studentsRes, enrollmentsRes, transactionsRes] =
          await Promise.all([
            axios.get(`${BACK_URL}/api/admin/courses`, {
              headers: { "x-admin-token": ADMIN_TOKEN },
            }),
            axios.get(`${BACK_URL}/api/admin/users`, {
              headers: { "x-admin-token": ADMIN_TOKEN },
            }),
            axios.get(`${BACK_URL}/api/admin/enrollments`, {
              headers: { "x-admin-token": ADMIN_TOKEN },
            }),
            axios.get(`${BACK_URL}/api/admin/payments`, {
              headers: { "x-admin-token": ADMIN_TOKEN },
            }),
          ]);

        const courses = coursesRes.data || [];
        const students = studentsRes.data || [];
        const enrollments = enrollmentsRes.data || [];
        const transactions = transactionsRes.data || [];

        // Add student count in each course
        const coursesWithCounts = courses.map((course) => {
          const count = enrollments.filter(
            (enr) =>
              (enr.course?._id || enr.course) === (course._id || course.id)
          ).length;
          return { ...course, studentsCount: count };
        });

        // Revenue from successful payments
        const totalRevenue = transactions.reduce(
          (sum, tx) =>
            tx.status === "success" ? sum + (tx.amount || 0) : sum,
          0
        );

        setStats({
          courses: courses.length,
          students: students.length,
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          revenue: totalRevenue,
          enrollments: enrollments.length,
        });

<<<<<<< HEAD
        setRecentCourses(coursesWithCounts.slice(-5).reverse());
        setRecentTransactions(transactions.slice(-5).reverse());
        setError(null);
=======
<<<<<<< HEAD
        setRecentCourses(coursesWithCounts.slice(-5).reverse());
        setRecentTransactions(transactions.slice(-5).reverse());
=======
        setRecentCourses(coursesWithCounts.slice(-5));
        setRecentTransactions(transactions.slice(-5));
        setError(null);
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Assembling Dashboard...</p>
    </div>
  );

  const statCards = [
    { title: "Total Courses", value: stats.courses, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Students", value: stats.students, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Enrollments", value: stats.enrollments, icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="p-4 md:p-10 bg-[#fafafa] min-h-screen">
<<<<<<< HEAD
=======
      {/* Header */}
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">System <span className="text-blue-600 italic">Overview.</span></h1>
        <p className="text-slate-500 font-medium mt-1">Real-time metrics and platform activity.</p>
      </header>

<<<<<<< HEAD
      {error && <p className="text-red-500 mb-4 font-bold text-center">{error}</p>}

=======
      {/* Stat Cards Bento Grid */}
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((item, idx) => (
          <motion.div 
            key={idx} whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group"
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
              <h2 className="text-2xl font-black text-slate-900">{item.value}</h2>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
              <item.icon size={28} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
<<<<<<< HEAD
=======
        
        {/* Recent Courses List */}
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Courses</h2>
            <BookOpen className="text-slate-300" size={20} />
          </div>
          <div className="space-y-4">
<<<<<<< HEAD
            {recentCourses.length === 0 ? (
              <p className="text-gray-400 text-center text-sm py-4">No data available</p>
            ) : (
              recentCourses.map((course) => (
                <div key={course._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all cursor-default">
                  <div>
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{course.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{course.studentsCount} Students Enrolled</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Latest Transactions</h2>
=======
            {recentCourses.map((course) => (
              <div key={course._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all cursor-default">
                <div>
                  <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{course.title}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{course.studentsCount} Students Enrolled</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors">
                  <ArrowRight size={16} />
=======

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Total Courses",
      value: stats.courses,
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      title: "Total Students",
      value: stats.students,
      icon: <Users className="w-8 h-8 text-green-500" />,
      color: "bg-green-100",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
      color: "bg-yellow-100",
    },
    {
      title: "Active Enrollments",
      value: stats.enrollments,
      icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-5 bg-white rounded-2xl shadow hover:shadow-lg transition`}
              >
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="text-xl font-semibold">{item.value}</h2>
                </div>
                <div className={`p-3 rounded-full ${item.color}`}>
                  {item.icon}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
                </div>
              </div>
            ))}
          </div>
<<<<<<< HEAD
        </div>

        {/* Transactions Table Style */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Latest Transactions</h2>
            <button className="text-blue-600 text-xs font-bold hover:underline">View All Records</button>
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          </div>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx._id} className="flex flex-wrap items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-blue-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{tx.student?.name || "Student"}</p>
                    <p className="text-[10px] font-bold text-slate-400">{new Date(tx.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusClass(tx.status)}`}>
                    {tx.status}
                  </span>
                  <p className="text-sm font-black text-slate-900">₹{tx.amount.toFixed(2)}</p>
                  <button onClick={() => setDetailsModal(tx)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <ArrowUpRight size={18} className="text-blue-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <AnimatePresence>
        {detailsModal && (
          <Modal title="Transaction Receipt" onClose={() => setDetailsModal(null)}>
            <div className="space-y-6 text-sm">
=======
      {/* Transaction Details Modal */}
      <AnimatePresence>
        {detailsModal && (
          <Modal title="Transaction Receipt" onClose={() => setDetailsModal(null)}>
            <div className="space-y-6">
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Student</span>
                  <span className="text-sm font-bold text-slate-900">{detailsModal.student?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Course</span>
                  <span className="text-sm font-bold text-slate-900 truncate ml-4">{detailsModal.course?.title}</span>
                </div>
                <div className="h-px bg-slate-200 border-dashed border-t" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Amount Paid</span>
                  <span className="text-xl font-black text-emerald-600">₹{detailsModal.amount}</span>
                </div>
              </div>
              <div className="px-2 space-y-2 text-[11px] font-medium text-slate-400">
                <p className="flex justify-between"><span>Payment ID:</span> <span>{detailsModal.paymentId}</span></p>
                <p className="flex justify-between"><span>Date:</span> <span>{new Date(detailsModal.createdAt).toLocaleString()}</span></p>
              </div>
              <button onClick={() => setDetailsModal(null)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200">
                Close Details
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
<<<<<<< HEAD
}
=======
}
=======

          {/* Recent Courses & Transactions */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Courses</h2>
              {recentCourses.length === 0 ? (
                <p className="text-gray-500">No courses yet</p>
              ) : (
                <ul className="space-y-3">
                  {recentCourses.map((course) => (
                    <li
                      key={course._id || course.id}
                      className="flex justify-between border-b pb-2"
                    >
                      <span>{course.title}</span>
                      <span className="text-gray-500">
                        {course.studentsCount} students
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                Recent Transactions
              </h2>
              {recentTransactions.length === 0 ? (
                <p className="text-gray-500">No transactions yet</p>
              ) : (
                <ul className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <li
                      key={tx._id || tx.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">
                          {tx.student?.name || "Unknown Student"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(
                            tx.status
                          )}`}
                        >
                          ₹{(tx.amount).toFixed(2)}
                        </span>
                        <button
                          onClick={() => setDetailsModal(tx)}
                          className="text-blue-500 hover:underline text-sm"
                        >
                          View
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* View Details Modal */}
          {detailsModal && (
            <Modal
              title="Transaction Details"
              onClose={() => setDetailsModal(null)}
            >
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Student:</span>{" "}
                  {detailsModal.student?.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {detailsModal.student?.email}
                </p>
                <p>
                  <span className="font-semibold">Course:</span>{" "}
                  {detailsModal.course?.title}
                </p>
                <p>
                  <span className="font-semibold">Payment ID:</span>{" "}
                  {detailsModal.paymentId}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> ₹
                  {detailsModal.amount}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {detailsModal.status}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(detailsModal.createdAt).toLocaleString()}
                </p>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
