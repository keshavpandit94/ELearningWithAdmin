import Course from "../models/Course.model.js";
import mongoose from "mongoose";


// Get all courses (only include instructor data if instructor role is student)
export const getAllCourses = async (req, res) => {
  try {
    // Populate instructor info and filter only students
    let courses = await Course.find().populate({
      path: "instructor",
      match: { role: "student" },
      select: "name role",
    });

    // Remove courses whose instructor was filtered out (populate returns null)
    courses = courses.filter(course => course.instructor !== null);

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single course (only include instructor data if role is student)
export const getCourseById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(req.params.id).populate({
      path: "instructor",
      match: { role: "student" },
      select: "name role",
    });

    if (!course || !course.instructor) {
      return res.status(404).json({ message: "Course not found or instructor not a student" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
