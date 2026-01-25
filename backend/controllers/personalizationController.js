// personalizationController.js
import { Personalization } from '../models/Personalization.js';
import { Skill } from '../models/Skill.js';

// Helper function to generate personalized roadmap on backend
const generatePersonalizedRoadmap = (userAnswers, allSkills) => {
  const { danceStyle, experienceLevel, weeklyHours, goals, primaryGoal, practiceEnvironment } = userAnswers;

  console.log('=== GENERATING PERSONALIZED ROADMAP ===');
  console.log('User answers:', userAnswers);
  console.log('Total skills available:', allSkills.length);

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
  console.log('Categories before filtering:', personalizedCategories.length);

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

    console.log(`Category "${category.title}" - Before filter:`, filteredSkills.length);

    if (experienceLevel === 'complete-beginner') {
      // Only show beginner skills (case-insensitive)
      filteredSkills = filteredSkills.filter(skill => {
        const skillDiff = skill.difficulty?.toLowerCase();
        const matches = skillDiff === 'beginner';
        if (!matches) {
          console.log(`    ❌ Filtering out "${skill.title}" (difficulty: "${skill.difficulty}")`);
        }
        return matches;
      });
    } else if (experienceLevel === 'some-experience') {
      // Show beginner and intermediate (case-insensitive)
      filteredSkills = filteredSkills.filter(skill => {
        const skillDiff = skill.difficulty?.toLowerCase();
        return skillDiff === 'beginner' || skillDiff === 'intermediate';
      });
    }
    // For 'intermediate' and 'advanced', show all skills

    console.log(`Category "${category.title}" - After filter:`, filteredSkills.length);

    return { ...category, skills: filteredSkills };
  }).filter(category => {
    // CRITICAL: Only remove categories if they have NO skills
    const hasSkills = category.skills.length > 0;
    if (!hasSkills) {
      console.log(`⚠️ Removing empty category: ${category.title}`);
    }
    return hasSkills;
  });

  console.log('Categories after filtering:', personalizedCategories.length);

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

  console.log('Total skills in roadmap:', totalSkills);
  console.log('Recommended per week:', recommendedPerWeek);
  console.log('Estimated weeks:', weeksToComplete);

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

  const result = {
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

  console.log('=== ROADMAP GENERATION COMPLETE ===');
  console.log('Final categories:', result.categories.length);
  result.categories.forEach(cat => {
    console.log(`  - ${cat.title}: ${cat.skills.length} skills`);
  });

  return result;
};

// @desc    Save user personalization and generate roadmap
// @route   POST /api/personalization
// @access  Private
export const savePersonalization = async (req, res) => {
  try {
    const { answers } = req.body;

    console.log('=== BACKEND PERSONALIZATION DEBUG ===');
    console.log('Saving personalization for user:', req.user._id);
    console.log('Answers received:', answers);

    // Fetch all skills from database
    const allSkills = await Skill.findAll();
    console.log('Total skills fetched from DB:', allSkills.length);
    
    if (allSkills.length === 0) {
      return res.status(400).json({ 
        message: 'No skills found in database. Please seed the database first.' 
      });
    }

    // Generate personalized roadmap on backend
    const generatedRoadmap = generatePersonalizedRoadmap(answers, allSkills);
    console.log('Generated roadmap categories:', generatedRoadmap.categories.length);
    
    // Log each category
    generatedRoadmap.categories.forEach(cat => {
      console.log(`Category: ${cat.title}, Skills: ${cat.skills.length}`);
    });

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

    console.log('✅ Personalization saved successfully');
    console.log('📤 Sending response with', generatedRoadmap.categories.length, 'categories');

    // ✅ Make sure this matches what frontend expects
    res.json({
      success: true,
      message: 'Personalization saved successfully',
      personalization: {
        answers: personalization.answers,
        generatedRoadmap: personalization.generatedRoadmap,
        updatedAt: personalization.updatedAt
      }
    });
  } catch (error) {
    console.error('❌ Error saving personalization:', error);
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