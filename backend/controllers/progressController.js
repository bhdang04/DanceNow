import { Progress } from '../models/Progress.js';

// @desc    Get all progress for current user
// @route   GET /api/progress
// @access  Private
export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.findByUserId(req.user._id);

    res.json({
      success: true,
      count: progress.length,
      progress
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get progress statistics
// @route   GET /api/progress/stats
// @access  Private
export const getProgressStats = async (req, res) => {
  try {
    const stats = await Progress.getStats(req.user._id);

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Mark skill as complete
// @route   POST /api/progress/complete/:skillId
// @access  Private
export const markSkillComplete = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { notes } = req.body;

    const progress = await Progress.markComplete(req.user._id, skillId, notes || '');

    res.json({
      success: true,
      message: 'Skill marked as complete',
      progress
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Mark skill as incomplete
// @route   POST /api/progress/incomplete/:skillId
// @access  Private
export const markSkillIncomplete = async (req, res) => {
  try {
    const { skillId } = req.params;

    const progress = await Progress.markIncomplete(req.user._id, skillId);

    res.json({
      success: true,
      message: 'Skill marked as incomplete',
      progress
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update skill progress (add notes, etc.)
// @route   PUT /api/progress/:skillId
// @access  Private
export const updateSkillProgress = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { notes, completed } = req.body;

    const updateData = {};
    if (notes !== undefined) updateData.notes = notes;
    if (completed !== undefined) {
      updateData.completed = completed;
      updateData.completedAt = completed ? new Date() : null;
    }

    const progress = await Progress.upsert(req.user._id, skillId, updateData);

    res.json({
      success: true,
      message: 'Progress updated',
      progress
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete progress for a skill
// @route   DELETE /api/progress/:skillId
// @access  Private
export const deleteProgress = async (req, res) => {
  try {
    const { skillId } = req.params;

    const result = await Progress.deleteByUserAndSkill(req.user._id, skillId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.json({
      success: true,
      message: 'Progress deleted'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};