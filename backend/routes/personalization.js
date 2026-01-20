import express from 'express';
import {
  savePersonalization,
  getPersonalization,
  deletePersonalization
} from '../controllers/personalizationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/', savePersonalization);
router.get('/', getPersonalization);
router.delete('/', deletePersonalization);

export default router;