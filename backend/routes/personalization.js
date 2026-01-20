import express from 'express';
import {
  savePersonalization,
  getPersonalization,
  regeneratePersonalization,
  deletePersonalization
} from '../controllers/personalizationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', savePersonalization);
router.get('/', getPersonalization);
router.post('/regenerate', regeneratePersonalization); // Add this
router.delete('/', deletePersonalization);

export default router;