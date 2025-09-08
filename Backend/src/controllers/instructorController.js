import Instructor from "../models/Instructor.model.js";
import mongoose from "mongoose";

export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInstructorDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid instructor ID" });

    const instructor = await Instructor.findById(id).select("name email bio profilePicture");
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });

    res.json(instructor);
  } catch (error) {
    console.error("Error fetching instructor:", error);
    res.status(500).json({ message: "Server error while fetching instructor" });
  }
};
