import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  skillId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  duration: String,
  videoUrl: String,
  description: String,
  keyPoints: [String],
  commonMistakes: [String],
  practiceDrills: [{
    title: String,
    description: String
  }],
  prerequisites: [String]
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);