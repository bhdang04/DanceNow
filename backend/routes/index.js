import express from 'express';
import authRoutes from './auth.js';
import progressRoutes from './progress.js';
import skillsRoutes from './skills.js';
import personalizationRoutes from './personalization.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/progress', progressRoutes);
router.use('/skills', skillsRoutes);
router.use('/personalization', personalizationRoutes);

export default router;