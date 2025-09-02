import { useEffect, useState } from "react";
import BACK_URL, { ADMIN_TOKEN } from "../api";
import axios from "axios";
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
} from "lucide-react";

// Modal component with close button
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailsModal, setDetailsModal] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BACK_URL}/api/admin/payments`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setTransactions(res.data);
    } catch (err) {
      setError("Unable to fetch transactions.");
    }
    setLoading(false);
  };

  const refundTransaction = async (id) => {
    setError("");
    try {
      const res = await axios.post(
        `${BACK_URL}/api/admin/payments/${id}/refund`,
        {},
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      );
      setTransactions((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: "refunded" } : t))
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <span className="flex items-center gap-1 bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
            <CheckCircle className="w-4 h-4" /> Success
          </span>
        );
      case "refunded":
        return (
          <span className="flex items-center gap-1 bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
            <RotateCcw className="w-4 h-4" /> Refunded
          </span>
        );
      case "failed":
      case "cancel":
        return (
          <span className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
            <XCircle className="w-4 h-4" /> Failed/Cancelled
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      {loading && (
        <p className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading transactions...
        </p>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm sm:text-base">
              <th className="p-3">Student</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && !loading && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
            {transactions.map((t) => (
              <tr
                key={t._id}
                className="border-b hover:bg-gray-50 text-sm sm:text-base"
              >
                <td className="p-3">{t.student?.name || "N/A"}</td>
                <td className="p-3 flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  {(t.amount ).toFixed(2)}
                </td>
                <td className="p-3">{getStatusBadge(t.status)}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setDetailsModal(t)}
                    className="inline-flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                  {t.status === "success" && (
                    <button
                      onClick={() => refundTransaction(t._id)}
                      className="inline-flex items-center gap-1 bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
                    >
                      <RotateCcw className="w-4 h-4" /> Refund
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {detailsModal && (
        <Modal
          title="Transaction Details"
          onClose={() => setDetailsModal(null)}
        >
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Student:</span>{" "}
              {detailsModal.student?.name || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Email:</span>{" "}
              {detailsModal.student?.email || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Course:</span>{" "}
              {detailsModal.course?.title || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Payment ID:</span>{" "}
              {detailsModal.paymentId || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Amount:</span> ₹
              {(detailsModal.amount / 100).toFixed(2)}
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Status:</span>{" "}
              {detailsModal.status}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">Date:</span>{" "}
              {new Date(detailsModal.createdAt).toLocaleString()}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
