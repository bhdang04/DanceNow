import express from 'express';
import {
  getUserProgress,
  markSkillComplete,
  markSkillIncomplete,
  updateSkillProgress,
  deleteProgress,
  getProgressStats
} from '../controllers/progressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All progress routes require authentication
router.use(protect);

// Get all progress for the current user
router.get('/', getUserProgress);

// Get progress statistics (completed count, percentage, etc.)
router.get('/stats', getProgressStats);

// Mark a skill as complete
router.post('/complete/:skillId', markSkillComplete);

// Mark a skill as incomplete
router.post('/incomplete/:skillId', markSkillIncomplete);

// Update progress (add notes, etc.)
router.put('/:skillId', updateSkillProgress);

// Delete progress for a specific skill
router.delete('/:skillId', deleteProgress);

export default router;