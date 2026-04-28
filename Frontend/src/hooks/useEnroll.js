import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BACKEND_URL from "../api";

export default function useEnroll({ token, user, courseId }) {
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // 1. Helper to check enrollment status
  const checkEnrollment = useCallback(async () => {
    // If no user/token, they definitely aren't enrolled
    if (!token || !courseId) {
      setIsEnrolled(false);
      return;
    }

    try {
      const res = await axios.get(`${BACKEND_URL}/api/enrollments/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Search courses that match current courseId with enrolled status
      const enrolledCourse = (res.data || []).find(
        (entry) => (entry.course?._id === courseId || entry.course === courseId) && entry.status === "enrolled"
      );

      setIsEnrolled(!!enrolledCourse);
    } catch (err) {
      console.error("❌ Enrollment check failed:", err);
      setIsEnrolled(false);
    }
  }, [token, courseId]);

  // Sync enrollment status on mount or when courseId changes
  useEffect(() => {
    checkEnrollment();
  }, [checkEnrollment]);

  // 2. Primary Enrollment Function
  const enroll = async (course) => {
    if (!token) {
      alert("Please login to start your journey! 🎓");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/enrollments`,
        { courseId: course._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data;

      // Logic for Free Courses
      if (data.message === "Enrolled successfully") {
        alert("✅ Successfully enrolled in this free course!");
        setIsEnrolled(true);
        await checkEnrollment();
        setLoading(false);
        return;
      }

      // Logic for Paid Courses (Razorpay)
      if (data.message === "Payment required") {
        const { orderId, price, currency, key } = data;

        // Load Razorpay Script dynamically if missing
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
          alert("Could not connect to the payment gateway. Please check your internet.");
          setLoading(false);
          return;
        }

        const options = {
          key,
          amount: price * 100, // Razorpay works in paise
          currency,
          name: "ELRN Platform",
          description: `Unlocking: ${course.title}`,
          order_id: orderId,
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
          },
          theme: { color: "#2563eb" }, // Primary Blue
          handler: async (response) => {
            try {
              // Verify Payment on Backend
              const verifyRes = await axios.post(
                `${BACKEND_URL}/api/enrollments/verify`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  courseId: course._id,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );

              if (verifyRes.data.message.includes("success")) {
                alert("✅ Payment successful! Welcome to the course.");
                setIsEnrolled(true);
                await checkEnrollment();
              } else {
                alert("⚠️ Payment verification failed. Please contact support.");
              }
            } catch (err) {
              console.error("❌ Verification error:", err);
              alert("❌ Payment verification failed.");
            } finally {
              setLoading(false);
            }
          },
          modal: {
            ondismiss: async () => {
              await handlePaymentFailure(orderId, course._id, token);
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        
        rzp.on("payment.failed", async () => {
          alert("⚠️ Payment failed or was cancelled.");
          await handlePaymentFailure(orderId, course._id, token);
          setLoading(false);
        });

        rzp.open();
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert(err.response?.data?.message || "❌ Something went wrong during enrollment.");
      setLoading(false);
    }
  };

  return { enroll, isEnrolled, loading, checkEnrollment };
}

/**
 * UTILITIES
 */

// Handle Failed/Cancelled Payments
async function handlePaymentFailure(orderId, courseId, token) {
  try {
    await axios.post(
      `${BACKEND_URL}/api/enrollments/payment-failed`,
      { orderId, courseId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("Failed to sync payment failure:", error);
  }
}

// Load Razorpay JS SDK
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}