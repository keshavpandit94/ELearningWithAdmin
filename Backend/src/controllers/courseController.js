import Course from "../models/Course.model.js";
import mongoose from "mongoose";

// Get all courses (only include instructor data if instructor role is 'student')
export const getAllCourses = async (req, res) => {
  try {
    // Populate instructor data, selecting only relevant fields
    let courses = await Course.find().populate({
      path: "instructor",
      select: "name email bio profilePicture", // fields from Instructor model
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single course by ID (populate instructor info)
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(id).populate({
      path: "instructor",
      select: "name email bio profilePicture", // fields from Instructor model
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
