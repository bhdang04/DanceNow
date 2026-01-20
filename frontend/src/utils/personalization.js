export const generatePersonalizedRoadmap = (userAnswers, allCategories) => {
  const { danceStyle, experienceLevel, weeklyHours, goals } = userAnswers;

  // Clone categories to avoid mutation
  let personalizedCategories = JSON.parse(JSON.stringify(allCategories));

  // 1. Prioritize categories based on dance style
  const stylePriorities = {
    'all-around': ['rhythm-musicality', 'core-grooves', 'isolations', 'foundation-styles', 'freestyle-basics'],
    'freestyle': ['rhythm-musicality', 'freestyle-basics', 'core-grooves', 'isolations', 'foundation-styles'],
    'choreography': ['core-grooves', 'rhythm-musicality', 'isolations', 'freestyle-basics', 'foundation-styles'],
    'breaking': ['core-grooves', 'foundation-styles', 'isolations', 'rhythm-musicality', 'freestyle-basics'],
    'popping-locking': ['isolations', 'foundation-styles', 'core-grooves', 'rhythm-musicality', 'freestyle-basics']
  };

  const priorityOrder = stylePriorities[danceStyle] || stylePriorities['all-around'];

  // Reorder categories based on priority
  personalizedCategories.sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.id);
    const bIndex = priorityOrder.indexOf(b.id);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  // 2. Filter skills based on experience level
  personalizedCategories = personalizedCategories.map(category => {
    let filteredSkills = [...category.skills];

    if (experienceLevel === 'complete-beginner') {
      // Only show beginner skills initially
      filteredSkills = filteredSkills.filter(skill => skill.difficulty === 'beginner');
    } else if (experienceLevel === 'some-experience') {
      // Show beginner and some intermediate
      filteredSkills = filteredSkills.filter(skill => 
        skill.difficulty === 'beginner' || skill.difficulty === 'intermediate'
      );
    }
    // intermediate and advanced see all skills

    return { ...category, skills: filteredSkills };
  });

  // 3. Add recommended skills per week based on time commitment
  const skillsPerWeek = {
    '1-3': 2,
    '3-5': 3,
    '5-10': 5,
    '10+': 7
  };

  const recommendedPerWeek = skillsPerWeek[weeklyHours] || 3;

  // 4. Add goal-specific recommendations
  const goalRecommendations = [];
  
  if (goals.includes('freestyle')) {
    goalRecommendations.push({
      message: 'Focus extra time on improvisation and musicality',
      categories: ['freestyle-basics', 'rhythm-musicality']
    });
  }
  
  if (goals.includes('battles')) {
    goalRecommendations.push({
      message: 'Practice power moves and confidence-building',
      categories: ['foundation-styles', 'freestyle-basics']
    });
  }
  
  if (goals.includes('fitness')) {
    goalRecommendations.push({
      message: 'High-energy grooves will help with cardio',
      categories: ['core-grooves', 'foundation-styles']
    });
  }

  // 5. Calculate estimated completion time
  const totalSkills = personalizedCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const weeksToComplete = Math.ceil(totalSkills / recommendedPerWeek);

  return {
    categories: personalizedCategories,
    recommendedPerWeek,
    estimatedWeeks: weeksToComplete,
    goalRecommendations,
    userProfile: {
      danceStyle,
      experienceLevel,
      weeklyHours,
      goals
    }
  };
};

// Generate milestones based on progress
export const generateMilestones = (totalSkills) => {
  return [
    { percentage: 25, title: 'Foundation Builder', description: 'Mastered the basics!' },
    { percentage: 50, title: 'Intermediate Dancer', description: 'Halfway there!' },
    { percentage: 75, title: 'Advanced Student', description: 'Almost a pro!' },
    { percentage: 100, title: 'Hip-Hop Master', description: 'You did it!' }
  ];
};

// Check which milestone user just reached
export const checkMilestoneAchieved = (oldPercentage, newPercentage, milestones) => {
  for (const milestone of milestones) {
    if (oldPercentage < milestone.percentage && newPercentage >= milestone.percentage) {
      return milestone;
    }
  }
  return null;
};