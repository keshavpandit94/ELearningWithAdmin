import { useEffect, useState } from "react";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  RotateCcw,
  X,
  User,
  Mail,
  BookOpen,
  CreditCard,
  Calendar,
  IndianRupee,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  ArrowUpRight,
  ShieldCheck,
  ReceiptText
} from "lucide-react";

// Modern Glass Modal
function Modal({ title, children, onClose }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md relative overflow-hidden border border-slate-100"
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-50">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailsModal, setDetailsModal] = useState(null);

  useEffect(() => { fetchTransactions(); }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACK_URL}/api/admin/payments`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setTransactions(res.data);
    } catch (err) {
      setError("Unable to synchronize transaction records.");
    }
    setLoading(false);
  };

  const refundTransaction = async (id) => {
    if(!window.confirm("Authorize full refund for this transaction?")) return;
    try {
      await axios.post(`${BACK_URL}/api/admin/payments/${id}/refund`, {}, { 
        headers: { "x-admin-token": ADMIN_TOKEN } 
      });
      setTransactions((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: "refunded" } : t))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Refund authorization failed.");
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "success") return "bg-emerald-50 text-emerald-600 border-emerald-100";
    if (s === "refunded") return "bg-purple-50 text-purple-600 border-purple-100";
    if (s === "failed" || s === "cancel") return "bg-rose-50 text-rose-600 border-rose-100";
    return "bg-slate-50 text-slate-500 border-slate-100";
  };

  return (
    <div className="p-4 md:p-10 bg-[#fafafa] min-h-screen">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            Financial <span className="text-blue-600 italic">Ledger.</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Audit platform revenue and payment statuses.</p>
        </div>
        
        <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm items-center gap-2">
           <ShieldCheck size={18} className="text-emerald-500 ml-2" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 pr-2">Secure Node</span>
        </div>
      </header>

      {error && <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-bold text-sm text-center">{error}</div>}

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {["STUDENT / REFERENCE", "AMOUNT", "STATUS", "DATE", "ACTIONS"].map((head) => (
                  <th key={head} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="5" className="p-20 text-center"><Loader2 className="animate-spin inline text-blue-600" /></td></tr>
              ) : (
                transactions.map((t, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                    key={t._id} className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                          <User size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 leading-tight">{t.student?.name || "Anonymous"}</span>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{t.paymentId || "No-Ref"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1 font-black text-slate-900 italic">
                        <IndianRupee size={14} className="text-slate-400" />
                        {t.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusBadge(t.status)}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-400 text-xs font-bold">
                      {new Date(t.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setDetailsModal(t)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                          <Eye size={16} />
                        </button>
                        {t.status === "success" && (
                          <button onClick={() => refundTransaction(t._id)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-purple-400 hover:bg-purple-600 hover:text-white transition-all shadow-sm">
                            <RotateCcw size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- DETAILS MODAL --- */}
      <AnimatePresence>
        {detailsModal && (
          <Modal title="Payment Summary" onClose={() => setDetailsModal(null)}>
            <div className="space-y-6">
               <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Receipt Amount</p>
                    <p className="text-3xl font-black italic flex items-center gap-1"><IndianRupee size={22} /> {detailsModal.amount.toFixed(2)}</p>
                  </div>
                  <ReceiptText size={40} className="opacity-20" />
               </div>

               <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-slate-400"><User size={14}/></div>
                      <span className="text-[11px] font-black text-slate-400 uppercase">Student</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{detailsModal.student?.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-slate-400"><BookOpen size={14}/></div>
                      <span className="text-[11px] font-black text-slate-400 uppercase">Course</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 max-w-[150px] truncate">{detailsModal.course?.title}</span>
                  </div>

                  <div className="h-px bg-slate-200/50" />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-slate-400"><CreditCard size={14}/></div>
                      <span className="text-[11px] font-black text-slate-400 uppercase">Gateway ID</span>
                    </div>
                    <span className="text-[10px] font-mono font-black text-blue-600">{detailsModal.paymentId}</span>
                  </div>
               </div>

               <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  <Calendar size={12} />
                  Processed on {new Date(detailsModal.createdAt).toLocaleString()}
               </div>

               <button onClick={() => setDetailsModal(null)} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all">
                  DONE
               </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}