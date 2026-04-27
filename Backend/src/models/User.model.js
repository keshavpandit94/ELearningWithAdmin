import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'instructor'], default: 'student' },
  suspendUntil: { type: Date, default: null }, // Date until which user is suspended
}, { timestamps: true });

export default mongoose.model('User', userSchema);
