import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
  getAllPayments,
  transferPayment,
  getAllUsers,
  getUserById,
  updateUser,
  suspendUser,
  unsuspendUser,
  uploadCourseVideo,
  deleteCourseVideo,
} from "../controllers/adminController.js";

import { adminProtect } from "../middlewares/adminProtect.js";
import { uploadVideos, uploadImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Protect all routes with JWT and admin check
router.use(adminProtect);

// Course routes
router.post("/courses",uploadImage.single("thumbnail"), createCourse);
router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);
router.post(
  "/courses/:id/videos",
  uploadVideos.single("video"),
  uploadCourseVideo
);
// Video delete route
router.delete("/courses/:courseId/videos/:videoId", deleteCourseVideo);

// Enrollment routes
router.get("/enrollments", getAllEnrollments);
router.get("/enrollments/:id", getEnrollmentById);
router.put("/enrollments/:id", updateEnrollment);
router.delete("/enrollments/:id", deleteEnrollment);

// Payment routes
router.get("/payments", getAllPayments);
router.post("/payments/:id/transfer", transferPayment); // e.g., POST to trigger transfer

// User routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.post("/users/:id/suspend", suspendUser);
router.post("/users/:id/unsuspend", unsuspendUser);

export default router;
