import { Personalization } from '../models/Personalization.js';

// @desc    Save user personalization
// @route   POST /api/personalization
// @access  Private
export const savePersonalization = async (req, res) => {
  try {
    const personalizationData = req.body;

    console.log('Saving personalization for user:', req.user._id);

    const personalization = await Personalization.upsert(
      req.user._id, 
      personalizationData
    );

    res.json({
      success: true,
      message: 'Personalization saved successfully',
      personalization
    });
  } catch (error) {
    console.error('Error saving personalization:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user personalization
// @route   GET /api/personalization
// @access  Private
export const getPersonalization = async (req, res) => {
  try {
    const personalization = await Personalization.findByUserId(req.user._id);

    if (!personalization) {
      return res.status(404).json({ message: 'No personalization found' });
    }

    res.json({
      success: true,
      personalization
    });
  } catch (error) {
    console.error('Error getting personalization:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete user personalization
// @route   DELETE /api/personalization
// @access  Private
export const deletePersonalization = async (req, res) => {
  try {
    const result = await Personalization.deleteByUserId(req.user._id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No personalization found' });
    }

    res.json({
      success: true,
      message: 'Personalization deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting personalization:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};