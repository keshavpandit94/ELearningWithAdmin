import { useEffect, useState } from "react";
import { 
  BookOpen, Users, DollarSign, GraduationCap, X, 
  ArrowUpRight, ArrowRight, User, Loader2, Sparkles
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
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({ courses: 0, students: 0, revenue: 0, enrollments: 0 });
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [detailsModal, setDetailsModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "success": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "failed": return "bg-rose-50 text-rose-600 border-rose-100";
      case "pending": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
          revenue: totalRevenue,
          enrollments: enrollments.length,
        });

        setRecentCourses(coursesWithCounts.slice(-5).reverse());
        setRecentTransactions(transactions.slice(-5).reverse());
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
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
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">System <span className="text-blue-600 italic">Overview.</span></h1>
        <p className="text-slate-500 font-medium mt-1">Real-time metrics and platform activity.</p>
      </header>

      {error && <p className="text-red-500 mb-4 font-bold text-center">{error}</p>}

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
        <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Courses</h2>
            <BookOpen className="text-slate-300" size={20} />
          </div>
          <div className="space-y-4">
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

      <AnimatePresence>
        {detailsModal && (
          <Modal title="Transaction Receipt" onClose={() => setDetailsModal(null)}>
            <div className="space-y-6 text-sm">
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
}