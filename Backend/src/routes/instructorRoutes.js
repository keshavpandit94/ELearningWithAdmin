import express from "express";
import {
  getAllInstructors,
  getInstructorDetailsById,
} from "../controllers/instructorController.js";

const router = express.Router();

router.get("/", getAllInstructors);
router.get("/:id", getInstructorDetailsById);

export default router;
