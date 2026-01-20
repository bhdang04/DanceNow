import { Personalization } from '../models/Personalization.js';
import { Skill } from '../models/Skill.js';

// Helper function to generate personalized roadmap on backend
const generatePersonalizedRoadmap = (userAnswers, allSkills) => {
  const { danceStyle, experienceLevel, weeklyHours, goals, primaryGoal, practiceEnvironment } = userAnswers;

  // Group skills by category
  const categoriesMap = {};
  allSkills.forEach(skill => {
    if (!categoriesMap[skill.categoryId]) {
      categoriesMap[skill.categoryId] = {
        id: skill.categoryId,
        title: skill.categoryTitle,
        description: skill.categoryDescription,
        difficulty: skill.categoryDifficulty,
        color: skill.categoryColor,
        skills: []
      };
    }
    categoriesMap[skill.categoryId].skills.push({
      id: skill.skillId,
      title: skill.title,
      difficulty: skill.difficulty,
      duration: skill.duration,
      videoUrl: skill.videoUrl,
      description: skill.description,
      keyPoints: skill.keyPoints,
      commonMistakes: skill.commonMistakes,
      practiceDrills: skill.practiceDrills,
      prerequisites: skill.prerequisites
    });
  });

  let personalizedCategories = Object.values(categoriesMap);

  // Prioritize categories based on dance style
  const stylePriorities = {
    'all-around': {
      order: ['rhythm-musicality', 'core-grooves', 'isolations', 'foundation-styles', 'freestyle-basics'],
      emphasis: 'balanced'
    },
    'freestyle': {
      order: ['rhythm-musicality', 'freestyle-basics', 'core-grooves', 'isolations', 'foundation-styles'],
      emphasis: 'rhythm-musicality'
    },
    'choreography': {
      order: ['core-grooves', 'rhythm-musicality', 'isolations', 'freestyle-basics', 'foundation-styles'],
      emphasis: 'core-grooves'
    },
    'breaking': {
      order: ['core-grooves', 'foundation-styles', 'isolations', 'rhythm-musicality', 'freestyle-basics'],
      emphasis: 'foundation-styles'
    },
    'popping-locking': {
      order: ['isolations', 'foundation-styles', 'core-grooves', 'rhythm-musicality', 'freestyle-basics'],
      emphasis: 'isolations'
    }
  };

  const styleConfig = stylePriorities[danceStyle] || stylePriorities['all-around'];

  // Reorder categories
  personalizedCategories.sort((a, b) => {
    const aIndex = styleConfig.order.indexOf(a.id);
    const bIndex = styleConfig.order.indexOf(b.id);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  // Filter skills based on experience level
  personalizedCategories = personalizedCategories.map(category => {
    let filteredSkills = [...category.skills];

    if (experienceLevel === 'complete-beginner') {
      filteredSkills = filteredSkills.filter(skill => skill.difficulty === 'beginner');
    } else if (experienceLevel === 'some-experience') {
      filteredSkills = filteredSkills.filter(skill => skill.difficulty !== 'advanced');
    }

    return { ...category, skills: filteredSkills };
  }).filter(category => category.skills.length > 0);

  // Mark priority categories
  if (styleConfig.emphasis !== 'balanced') {
    personalizedCategories = personalizedCategories.map(category => {
      if (category.id === styleConfig.emphasis) {
        return {
          ...category,
          isPriority: true,
          priorityMessage: 'Recommended focus area for your style'
        };
      }
      return category;
    });
  }

  // Calculate recommendations
  const skillsPerWeek = {
    '1-3': 2,
    '3-5': 3,
    '5-10': 5,
    '10+': 7
  };

  const recommendedPerWeek = skillsPerWeek[weeklyHours] || 3;
  const totalSkills = personalizedCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const weeksToComplete = Math.ceil(totalSkills / recommendedPerWeek);

  // Generate goal recommendations
  const goalRecommendations = [];
  const goalsArray = goals || [primaryGoal];

  if (goalsArray.includes('freestyle')) {
    goalRecommendations.push({
      message: 'Focus extra time on improvisation and musicality',
      categories: ['freestyle-basics', 'rhythm-musicality']
    });
  }

  if (goalsArray.includes('battles')) {
    goalRecommendations.push({
      message: 'Practice power moves and build your confidence',
      categories: ['foundation-styles', 'freestyle-basics']
    });
  }

  if (goalsArray.includes('choreography')) {
    goalRecommendations.push({
      message: 'Master clean execution and transitions',
      categories: ['core-grooves', 'isolations']
    });
  }

  if (goalsArray.includes('fitness')) {
    goalRecommendations.push({
      message: 'High-energy grooves will boost your cardio',
      categories: ['core-grooves', 'foundation-styles']
    });
  }

  if (goalsArray.includes('social')) {
    goalRecommendations.push({
      message: 'Learn cypher etiquette and build community',
      categories: ['freestyle-basics', 'rhythm-musicality']
    });
  }

  return {
    categories: personalizedCategories,
    recommendedPerWeek,
    estimatedWeeks: weeksToComplete,
    estimatedMonths: Math.ceil(weeksToComplete / 4),
    goalRecommendations,
    userProfile: {
      danceStyle,
      experienceLevel,
      weeklyHours: weeklyHours || '3-5',
      goals: goalsArray,
      practiceEnvironment: practiceEnvironment || 'anywhere'
    }
  };
};

// @desc    Save user personalization and generate roadmap
// @route   POST /api/personalization
// @access  Private
export const savePersonalization = async (req, res) => {
  try {
    const { answers } = req.body;

    console.log('Saving personalization for user:', req.user._id);

    // Fetch all skills from database
    const allSkills = await Skill.findAll();

    // Generate personalized roadmap on backend
    const generatedRoadmap = generatePersonalizedRoadmap(answers, allSkills);

    // Save to database
    const personalizationData = {
      answers,
      generatedRoadmap,
      updatedAt: new Date()
    };

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

// @desc    Regenerate personalized roadmap (if skills change)
// @route   POST /api/personalization/regenerate
// @access  Private
export const regeneratePersonalization = async (req, res) => {
  try {
    const personalization = await Personalization.findByUserId(req.user._id);

    if (!personalization) {
      return res.status(404).json({ message: 'No personalization found' });
    }

    // Fetch all skills
    const allSkills = await Skill.findAll();

    // Regenerate roadmap with existing answers
    const generatedRoadmap = generatePersonalizedRoadmap(personalization.answers, allSkills);

    // Update
    const updated = await Personalization.upsert(req.user._id, {
      answers: personalization.answers,
      generatedRoadmap,
      updatedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Roadmap regenerated successfully',
      personalization: updated
    });
  } catch (error) {
    console.error('Error regenerating personalization:', error);
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