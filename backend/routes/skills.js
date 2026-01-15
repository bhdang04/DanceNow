import express from 'express';
import {
  getAllSkills,
  getSkillById,
  getSkillsByCategory,
  getAllCategories,
  createSkill,
  updateSkill,
  deleteSkill,
  seedSkills
} from '../controllers/skillsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes (anyone can view skills)
router.get('/', getAllSkills);
router.get('/categories', getAllCategories);
router.get('/category/:categoryId', getSkillsByCategory);
router.get('/:skillId', getSkillById);

// Protected routes (for creating/updating skills)
router.post('/', protect, createSkill);
router.put('/:skillId', protect, updateSkill);
router.delete('/:skillId', protect, deleteSkill);

// Seed route (to populate initial data - can be protected or public during development)
router.post('/seed', seedSkills);

export default router;
