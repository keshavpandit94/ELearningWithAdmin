import { useEffect, useState } from "react";
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
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    revenue: 0,
    enrollments: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [detailsModal, setDetailsModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-600";
      case "failed":
        return "bg-red-100 text-red-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
          revenue: totalRevenue,
          enrollments: enrollments.length,
        });

        setRecentCourses(coursesWithCounts.slice(-5));
        setRecentTransactions(transactions.slice(-5));
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

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
                </div>
              </div>
            ))}
          </div>

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
