import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  bio: { type: String, trim: true },
  profilePicture: {
    public_id: String,
    url: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
