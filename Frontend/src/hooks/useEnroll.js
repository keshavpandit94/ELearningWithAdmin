import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BACKEND_URL from "../api";

export default function useEnroll({ token, user, courseId }) {
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Helper to check enrollment status
  const checkEnrollment = useCallback(async () => {
    if (!token || !courseId) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/api/enrollments/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Search courses that match current courseId with enrolled status
      const enrolledCourse = res.data.find(
        (entry) => entry.course?._id === courseId && entry.status === "enrolled"
      );

      setIsEnrolled(!!enrolledCourse);
    } catch (err) {
      console.error("Enrollment check failed:", err);
      setIsEnrolled(false);
    }
  }, [token, courseId]);

  useEffect(() => {
    checkEnrollment();
  }, [checkEnrollment]);

  // Enrollment function
  const enroll = async (course) => {
    if (!token) {
      alert("Please login to enroll.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/enrollments`,
        { courseId: course._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data;

      if (data.message === "Enrolled successfully") {
        alert("✅ Enrolled in free course!");
        await checkEnrollment();
        setLoading(false);
        return;
      }

      if (data.message === "Payment required") {
        const { orderId, price, currency, key } = data;

        const options = {
          key,
          amount: price * 100, // amount in paise
          currency,
          name: "E-Learning Platform",
          description: `Payment for ${course.title}`,
          order_id: orderId,
          prefill: {
            name: user?.name || "Student User",
            email: user?.email || "student@example.com",
          },
          theme: { color: "#3399cc" },
          handler: async (response) => {
            try {
              const verifyRes = await axios.post(
                `${BACKEND_URL}/api/enrollments/verify`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  courseId: course._id,
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              if (verifyRes.data.message.includes("success")) {
                alert("✅ Payment successful, enrolled!");
                await checkEnrollment();
              } else {
                alert("⚠️ Payment verification failed!");
              }
            } catch (err) {
              alert("❌ Verification failed.");
            } finally {
              setLoading(false);
            }
          },
          modal: {
            ondismiss: async () => {
              alert("⚠️ Payment window closed, enrollment incomplete.");
              try {
                await axios.post(
                  `${BACKEND_URL}/api/enrollments/payment-failed`,
                  { orderId, courseId: course._id },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
              } catch (error) {
                console.error("Failed updating payment state on dismissal:", error);
              }
              setLoading(false);
            },
          },
        };

        // Load Razorpay script if not already loaded
        if (!window.Razorpay) {
          const loaded = await loadRazorpayScript();
          if (!loaded) {
            alert("Failed to load payment gateway. Try again later.");
            setLoading(false);
            return;
          }
        }

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", async () => {
          alert("⚠️ Payment failed or cancelled.");
          try {
            await axios.post(
              `${BACKEND_URL}/api/enrollments/payment-failed`,
              { orderId, courseId: course._id },
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } catch (error) {
            console.error("Failed updating payment state on failure:", error);
          }
          setLoading(false);
        });

        rzp.open();
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("❌ Something went wrong during enrollment.");
      setLoading(false);
    }
  };

  return { enroll, isEnrolled, loading, checkEnrollment };
}

// Utility to dynamically load Razorpay JS SDK
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
