import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BACKEND_URL from "../api";

export default function useEnroll({ token, user, courseId }) {
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

<<<<<<< HEAD
  // 1. Helper to check enrollment status
  const checkEnrollment = useCallback(async () => {
    // If no user/token, they definitely aren't enrolled
    if (!token || !courseId) {
      setIsEnrolled(false);
      return;
    }
    
=======
  // Helper to check enrollment status
  const checkEnrollment = useCallback(async () => {
    if (!token || !courseId) return;
>>>>>>> 35975c69493032751758ba9568584d2f16146318
    try {
      const res = await axios.get(`${BACKEND_URL}/api/enrollments/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Search courses that match current courseId with enrolled status
<<<<<<< HEAD
      const enrolledCourse = (res.data || []).find(
=======
      const enrolledCourse = res.data.find(
>>>>>>> 35975c69493032751758ba9568584d2f16146318
        (entry) => entry.course?._id === courseId && entry.status === "enrolled"
      );

      setIsEnrolled(!!enrolledCourse);
    } catch (err) {
<<<<<<< HEAD
      console.error("❌ Enrollment check failed:", err);
=======
      console.error("Enrollment check failed:", err);
>>>>>>> 35975c69493032751758ba9568584d2f16146318
      setIsEnrolled(false);
    }
  }, [token, courseId]);

<<<<<<< HEAD
  // Sync enrollment status on mount or when courseId changes
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
  useEffect(() => {
    checkEnrollment();
  }, [checkEnrollment]);

<<<<<<< HEAD
  // 2. Primary Enrollment Function
  const enroll = async (course) => {
    if (!token) {
      alert("Please login to start your journey! 🎓");
=======
  // Enrollment function
  const enroll = async (course) => {
    if (!token) {
      alert("Please login to enroll.");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/enrollments`,
        { courseId: course._id },
<<<<<<< HEAD
        { headers: { Authorization: `Bearer ${token}` } }
=======
        {
          headers: { Authorization: `Bearer ${token}` },
        }
>>>>>>> 35975c69493032751758ba9568584d2f16146318
      );

      const data = res.data;

<<<<<<< HEAD
      // Logic for Free Courses
      if (data.message === "Enrolled successfully") {
        setIsEnrolled(true);
=======
      if (data.message === "Enrolled successfully") {
        alert("✅ Enrolled in free course!");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
        await checkEnrollment();
        setLoading(false);
        return;
      }

<<<<<<< HEAD
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
          amount: price * 100, // Razorpay works in paise/cents
          currency,
          name: "ELRN Platform",
          description: `Unlocking: ${course.title}`,
          order_id: orderId,
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
          },
          theme: { color: "#2563eb" }, // Your primary blue
          handler: async (response) => {
            try {
              // Verify Payment on Backend
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
              const verifyRes = await axios.post(
                `${BACKEND_URL}/api/enrollments/verify`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  courseId: course._id,
                },
<<<<<<< HEAD
                { headers: { Authorization: `Bearer ${token}` } }
              );

              if (verifyRes.data.message.includes("success")) {
                setIsEnrolled(true);
                await checkEnrollment();
              } else {
                alert("Payment verification failed. Please contact support.");
              }
            } catch (err) {
              console.error("Verification error:", err);
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
            } finally {
              setLoading(false);
            }
          },
          modal: {
<<<<<<< HEAD
            ondismiss: () => {
              handlePaymentFailure(orderId, course._id, token);
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
              setLoading(false);
            },
          },
        };

<<<<<<< HEAD
        const rzp = new window.Razorpay(options);
        
        rzp.on("payment.failed", () => {
          handlePaymentFailure(orderId, course._id, token);
=======
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
>>>>>>> 35975c69493032751758ba9568584d2f16146318
          setLoading(false);
        });

        rzp.open();
      }
    } catch (err) {
      console.error("Enrollment error:", err);
<<<<<<< HEAD
      alert("Something went wrong. Please try again.");
=======
      alert("❌ Something went wrong during enrollment.");
>>>>>>> 35975c69493032751758ba9568584d2f16146318
      setLoading(false);
    }
  };

  return { enroll, isEnrolled, loading, checkEnrollment };
}

<<<<<<< HEAD
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
=======
// Utility to dynamically load Razorpay JS SDK
>>>>>>> 35975c69493032751758ba9568584d2f16146318
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
