import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillId: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  notes: {
    type: String
  }
}, { timestamps: true });

// Compound index to prevent duplicate progress entries
progressSchema.index({ userId: 1, skillId: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);