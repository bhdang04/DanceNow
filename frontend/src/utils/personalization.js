export const generatePersonalizedRoadmap = (userAnswers, allCategories) => {
  const { danceStyle, experienceLevel, weeklyHours, goals } = userAnswers;

  // Clone categories to avoid mutation
  let personalizedCategories = JSON.parse(JSON.stringify(allCategories));

  // 1. PRIORITIZE categories based on dance style
  const stylePriorities = {
    'all-around': {
      order: ['rhythm-musicality', 'core-grooves', 'isolations', 'foundation-styles', 'freestyle-basics'],
      emphasis: 'balanced' // Show all equally
    },
    'freestyle': {
      order: ['rhythm-musicality', 'freestyle-basics', 'core-grooves', 'isolations', 'foundation-styles'],
      emphasis: 'rhythm-musicality' // Double down on this
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

  // Reorder categories based on priority
  personalizedCategories.sort((a, b) => {
    const aIndex = styleConfig.order.indexOf(a.id);
    const bIndex = styleConfig.order.indexOf(b.id);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  // 2. FILTER skills based on experience level
  personalizedCategories = personalizedCategories.map(category => {
    let filteredSkills = [...category.skills];

    if (experienceLevel === 'complete-beginner') {
      // Only show beginner skills
      filteredSkills = filteredSkills.filter(skill => skill.difficulty === 'beginner');
    } else if (experienceLevel === 'some-experience') {
      // Show beginner and intermediate, hide advanced
      filteredSkills = filteredSkills.filter(skill => 
        skill.difficulty !== 'advanced'
      );
    } else if (experienceLevel === 'intermediate') {
      // Show intermediate and beginner, some advanced
      // All skills visible but we could mark some as "challenge"
    }
    // 'advanced' sees everything

    return { ...category, skills: filteredSkills };
  }).filter(category => category.skills.length > 0); // Remove empty categories

  // 3. CALCULATE recommended skills per week based on time commitment
  const skillsPerWeek = {
    '1-3': 2,    // Casual: 1.5 hours per skill
    '3-5': 3,    // Regular: 1.5 hours per skill
    '5-10': 5,   // Serious: 2 hours per skill
    '10+': 7     // Dedicated: 1.5+ hours per skill
  };

  const recommendedPerWeek = skillsPerWeek[weeklyHours] || 3;

  // 4. ADD goal-specific recommendations
  const goalRecommendations = [];
  
  if (goals.includes('freestyle')) {
    goalRecommendations.push({
      message: 'Focus extra time on improvisation and musicality',
      categories: ['freestyle-basics', 'rhythm-musicality'],
      tip: 'Freestyle daily for 10 minutes, even if just to music'
    });
  }
  
  if (goals.includes('battles')) {
    goalRecommendations.push({
      message: 'Practice power moves and build your confidence',
      categories: ['foundation-styles', 'freestyle-basics'],
      tip: 'Watch battle videos and analyze what makes dancers win'
    });
  }
  
  if (goals.includes('choreography')) {
    goalRecommendations.push({
      message: 'Master clean execution and transitions',
      categories: ['core-grooves', 'isolations'],
      tip: 'Learn one 8-count per day and drill it until clean'
    });
  }
  
  if (goals.includes('fitness')) {
    goalRecommendations.push({
      message: 'High-energy grooves will boost your cardio',
      categories: ['core-grooves', 'foundation-styles'],
      tip: 'Dance for 30+ minutes continuously to build stamina'
    });
  }

  if (goals.includes('social')) {
    goalRecommendations.push({
      message: 'Learn cypher etiquette and build community',
      categories: ['freestyle-basics', 'rhythm-musicality'],
      tip: 'Attend local cyphers and practice giving energy to others'
    });
  }

  // 5. MARK high-priority skills based on style emphasis
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

  // 6. Calculate estimated completion time
  const totalSkills = personalizedCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const weeksToComplete = Math.ceil(totalSkills / recommendedPerWeek);

  // 7. Add skill unlocking logic (for skill tree feature)
  personalizedCategories = personalizedCategories.map(category => ({
    ...category,
    skills: category.skills.map(skill => ({
      ...skill,
      locked: false, // We'll implement prerequisite logic later
      prerequisites: skill.prerequisites || []
    }))
  }));

  return {
    categories: personalizedCategories,
    recommendedPerWeek,
    estimatedWeeks: weeksToComplete,
    estimatedMonths: Math.ceil(weeksToComplete / 4),
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
    { 
      percentage: 25, 
      title: 'Foundation Builder', 
      description: 'You\'ve mastered the basics!',
      icon: '🌱'
    },
    { 
      percentage: 50, 
      title: 'Intermediate Dancer', 
      description: 'Halfway to mastery!',
      icon: '🔥'
    },
    { 
      percentage: 75, 
      title: 'Advanced Student', 
      description: 'Almost there, keep pushing!',
      icon: '⭐'
    },
    { 
      percentage: 100, 
      title: 'Hip-Hop Master', 
      description: 'You did it! Now teach others!',
      icon: '👑'
    }
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