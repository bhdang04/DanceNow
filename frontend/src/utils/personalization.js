export const generatePersonalizedRoadmap = (userAnswers, allCategories) => {
  const { danceStyle, experienceLevel, weeklyHours, goals, primaryGoal, practiceEnvironment } = userAnswers;

  // Clone categories to avoid mutation
  let personalizedCategories = JSON.parse(JSON.stringify(allCategories));

  // 1. PRIORITIZE categories based on dance style
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
      filteredSkills = filteredSkills.filter(skill => skill.difficulty === 'beginner');
    } else if (experienceLevel === 'some-experience') {
      filteredSkills = filteredSkills.filter(skill => skill.difficulty !== 'advanced');
    }

    return { ...category, skills: filteredSkills };
  }).filter(category => category.skills.length > 0);

  // 3. CALCULATE recommended skills per week
  const skillsPerWeek = {
    '1-3': 2,
    '3-5': 3,
    '5-10': 5,
    '10+': 7
  };

  const recommendedPerWeek = skillsPerWeek[weeklyHours] || 3;

  // 4. ADD goal-specific recommendations
  const goalRecommendations = [];
  const goalsArray = goals || [primaryGoal]; // Support both mini and full answers

  if (goalsArray.includes('freestyle')) {
    goalRecommendations.push({
      message: 'Focus extra time on improvisation and musicality',
      categories: ['freestyle-basics', 'rhythm-musicality'],
      tip: 'Freestyle daily for 10 minutes, even if just to music'
    });
  }

  if (goalsArray.includes('battles')) {
    goalRecommendations.push({
      message: 'Practice power moves and build your confidence',
      categories: ['foundation-styles', 'freestyle-basics'],
      tip: 'Watch battle videos and analyze what makes dancers win'
    });
  }

  if (goalsArray.includes('choreography')) {
    goalRecommendations.push({
      message: 'Master clean execution and transitions',
      categories: ['core-grooves', 'isolations'],
      tip: 'Learn one 8-count per day and drill it until clean'
    });
  }

  if (goalsArray.includes('fitness')) {
    goalRecommendations.push({
      message: 'High-energy grooves will boost your cardio',
      categories: ['core-grooves', 'foundation-styles'],
      tip: 'Dance for 30+ minutes continuously to build stamina'
    });
  }

  if (goalsArray.includes('social')) {
    goalRecommendations.push({
      message: 'Learn cypher etiquette and build community',
      categories: ['freestyle-basics', 'rhythm-musicality'],
      tip: 'Attend local cyphers and practice giving energy to others'
    });
  }

  // 5. MARK high-priority skills
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

  return {
    categories: personalizedCategories,
    recommendedPerWeek,
    estimatedWeeks: weeksToComplete,
    estimatedMonths: Math.ceil(weeksToComplete / 4),
    goalRecommendations,
    userProfile: {
      danceStyle,
      experienceLevel,
      weeklyHours: weeklyHours || '3-5', // Default if not provided
      goals: goalsArray,
      practiceEnvironment: practiceEnvironment || 'anywhere'
    }
  };
};

// Generate milestones based on total skills
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

// Get milestone celebration message
export const getMilestoneCelebration = (milestone) => {
  const celebrations = {
    25: {
      title: '🎉 First Milestone Unlocked!',
      message: 'You\'ve built a solid foundation. Keep the momentum going!',
      reward: 'Foundation Badge Earned'
    },
    50: {
      title: '🔥 Halfway There!',
      message: 'You\'re crushing it! Your skills are really developing.',
      reward: 'Intermediate Badge Earned'
    },
    75: {
      title: '⭐ Almost A Master!',
      message: 'Just a few more skills and you\'ll be a hip-hop expert!',
      reward: 'Advanced Badge Earned'
    },
    100: {
      title: '👑 MASTERY ACHIEVED!',
      message: 'Congratulations! You\'ve completed your hip-hop journey. Time to teach others!',
      reward: 'Master Badge Earned'
    }
  };

  return celebrations[milestone.percentage] || {
    title: 'Milestone Reached!',
    message: 'Great progress!',
    reward: 'Badge Earned'
  };
};