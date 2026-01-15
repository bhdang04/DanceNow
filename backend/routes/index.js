import express from 'express';
import authRoutes from './auth.js';
import progressRoutes from './progress.js';
import skillsRoutes from './skills.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/progress', progressRoutes);
router.use('/skills', skillsRoutes);

export default router;