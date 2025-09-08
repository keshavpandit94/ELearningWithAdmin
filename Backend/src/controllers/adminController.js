import Course from "../models/Course.model.js";
import Enrollment from "../models/Enrollment.model.js";
import Payment from "../models/Payment.model.js";
import User from "../models/User.model.js";
import Instructor from "../models/Instructor.model.js";
import mongoose from "mongoose";

// ---------- Instructor CURD ----------

// Create Instructor
export const createInstructor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || name.trim().length < 3)
      return res.status(400).json({ message: "Instructor name is required and must be at least 3 characters" });

    if (!email || email.trim().length < 5)
      return res.status(400).json({ message: "Valid email is required" });

    // Optional profile picture handling
    const profilePicture = req.file
      ? {
          public_id: req.file.filename,
          url: req.file.path,
        }
      : null;

    const existing = await Instructor.findOne({ email: email.trim().toLowerCase() });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const instructor = await Instructor.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      bio,
      profilePicture,
    });

    res.status(201).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Instructors
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Instructor by ID
export const getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid instructor ID" });

    const instructor = await Instructor.findById(id);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });

    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Instructor
export const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid instructor ID" });

    const instructor = await Instructor.findById(id);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });

    ["name", "email", "bio"].forEach((field) => {
      if (updates[field] !== undefined) instructor[field] = updates[field];
    });

    if (req.file) {
      instructor.profilePicture = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    await instructor.save();
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Instructor
export const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid instructor ID" });

    const instructor = await Instructor.findById(id);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });

    await instructor.deleteOne();
    res.json({ message: "Instructor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New: Get an instructor with total duration of their courses
export const getInstructorWithTotalCourseTime = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid instructor ID" });

    const instructor = await Instructor.findById(id);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });

    const courses = await Course.find({ instructor: id }, { duration: 1 });
    const totalDuration = courses.reduce((acc, course) => acc + (course.duration || 0), 0);

    res.json({
      instructor,
      totalCourseTime: totalDuration,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Course CRUD ----------

export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      price,
      discountPrice,
      isFree,
      instructor,
    } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Thumbnail is required" });

    if (!instructor || instructor.trim().length < 3)
      return res.status(400).json({ message: "Instructor name is required and must be at least 3 characters" });

    let finalPrice = price;
    let finalDiscount = discountPrice;

    if (isFree === "true" || isFree === true) {
      finalPrice = 0;
      finalDiscount = 0;
    }

    const course = await Course.create({
      title,
      description,
      duration,
      price: finalPrice,
      discountPrice: finalDiscount || 0,
      isFree: isFree || false,
      instructor: instructor.trim(),
      thumbnail: {
        public_id: req.file.filename,
        url: req.file.path,
      },
      videos: [],
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email bio profilePicture");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(req.params.id).populate("instructor", "name email bio profilePicture");
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Update primitive fields normally
    for (const key of ["title", "description", "duration", "price", "discountPrice", "isFree"]) {
      if (updates[key] !== undefined) course[key] = updates[key];
    }

    // Handle instructor update by ID (if provided)
    if (updates.instructor !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(updates.instructor)) {
        return res.status(400).json({ message: "Invalid instructor ID" });
      }
      const instructorExists = await Instructor.findById(updates.instructor);
      if (!instructorExists) {
        return res.status(404).json({ message: "Instructor not found" });
      }
      course.instructor = updates.instructor;
    }

    await course.save();

    // Optionally populate instructor info before sending response
    await course.populate("instructor", "name email bio");

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadCourseVideo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid course ID" });

    if (!req.file)
      return res.status(400).json({ message: "Video file is required" });

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const videoData = {
      title: req.body.title || req.file.originalname,
      public_id: req.file.filename || req.file.public_id,
      url: req.file.path || req.file.secure_url,
    };

    course.videos.push(videoData);
    await course.save();

    res.status(201).json({ message: "Video uploaded successfully", video: videoData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourseVideo = async (req, res) => {
  try {
    const { courseId, videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId))
      return res.status(400).json({ message: "Invalid course ID" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const video = course.videos.id(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Cloudinary deletion (if used) can be done here

    video.remove();
    await course.save();

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Enrollment CRUD ----------

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "name email role")
      .populate("course", "title");
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid enrollment ID" });

    const enrollment = await Enrollment.findById(req.params.id)
      .populate("student", "name email role")
      .populate("course", "title");
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    if (updates.status) enrollment.status = updates.status;

    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    await enrollment.deleteOne();
    res.json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- Payment Read & Transfer ----------

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("student", "name email")
      .populate("course", "title");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const transferPayment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid payment ID" });

    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    // Integrate payment gateway here (demo):
    payment.status = "success";
    await payment.save();

    res.json({ message: "Payment transferred successfully", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------- User CRUD + Suspend (14 days) ----------

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid user ID" });

    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    ["name", "email", "role"].forEach((field) => {
      if (updates[field] !== undefined) user[field] = updates[field];
    });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const suspendUntil = new Date();
    suspendUntil.setDate(suspendUntil.getDate() + 14);
    user.suspendUntil = suspendUntil;

    await user.save();
    res.json({ message: `User suspended until ${suspendUntil.toISOString()}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unsuspendUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.suspendUntil = null;
    await user.save();
    res.json({ message: "User unsuspended", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
