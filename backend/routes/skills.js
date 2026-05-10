import express from 'express';

import {
  getAllSkills,
  getAllCategories,
  getSkillsByCategory,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  seedSkills
} from '../controllers/skillsController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllSkills);

router.get('/categories', getAllCategories);

router.get('/category/:categoryId', getSkillsByCategory);

router.get('/:skillId', getSkillById);

router.post('/seed', seedSkills);

// Protected routes
router.post('/', protect, createSkill);

router.put('/:skillId', protect, updateSkill);

router.delete('/:skillId', protect, deleteSkill);

export default router;