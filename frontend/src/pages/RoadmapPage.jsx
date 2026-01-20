import React, { useMemo, useEffect, useState } from 'react';
import ProgressBar from '../components/common/ProgressBar';
import RoadmapView from '../components/roadmap/RoadmapView';
import MilestoneCard from '../components/roadmap/MilestoneCard';
import { useSkills } from '../context/SkillsContext';
import { useProgress } from '../context/ProgressContext';
import { RefreshCw, Sparkles } from 'lucide-react';

const RoadmapPage = ({ onSkillClick, personalizedData, setPersonalizedData, onResetPersonalization }) => {
  const { categories: allCategories, loading: skillsLoading, getTotalSkills } = useSkills();
  const { calculateStats, progress, loading: progressLoading } = useProgress();
  const [displayCategories, setDisplayCategories] = useState([]);
  const [showPersonalizationInfo, setShowPersonalizationInfo] = useState(false);

  // Generate milestones locally (simple function)
  const generateMilestones = (totalSkills) => {
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

  // Load personalized roadmap or default categories
  // In the useEffect, add more logging
  useEffect(() => {
    if (!skillsLoading && allCategories.length > 0) {
      console.log('=== ROADMAP PAGE DEBUG ===');
      console.log('All categories from SkillsContext:', allCategories);
      console.log('Personalized data:', personalizedData);
      
      // If we have personalized data from backend, use it
      if (personalizedData && personalizedData.categories) {
        console.log('Using personalized roadmap with categories:', personalizedData.categories);
        console.log('Number of categories:', personalizedData.categories.length);
        
        // Check if categories have skills
        personalizedData.categories.forEach(cat => {
          console.log(`Category ${cat.title} has ${cat.skills?.length || 0} skills`);
        });
        
        setDisplayCategories(personalizedData.categories);
        setShowPersonalizationInfo(true);
      } else {
        // Show all categories if no personalization
        console.log('Using default roadmap with', allCategories.length, 'categories');
        setDisplayCategories(allCategories);
      }
    }
  }, [skillsLoading, allCategories, personalizedData]);

  // Calculate stats with total from skills
  const stats = useMemo(() => {
    const totalSkills = displayCategories.reduce((sum, cat) => sum + (cat.skills?.length || 0), 0);
    return calculateStats(totalSkills);
  }, [progress, displayCategories, calculateStats]);

  // Generate milestones
  const milestones = useMemo(() => {
    const totalSkills = displayCategories.reduce((sum, cat) => sum + (cat.skills?.length || 0), 0);
    return generateMilestones(totalSkills);
  }, [displayCategories]);

  // Reset personalization
  const handleResetPersonalization = () => {
    if (window.confirm('Are you sure you want to retake the personalization quiz? This will reset your custom roadmap.')) {
      onResetPersonalization();
    }
  };

  if (skillsLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Your Learning Roadmap</h1>
            {personalizedData && (
              <button
                onClick={handleResetPersonalization}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
              >
                <RefreshCw size={16} />
                Retake Quiz
              </button>
            )}
          </div>
          <p className="text-gray-600">Follow the path to master hip-hop fundamentals</p>
          
          <div className="mt-6">
            <ProgressBar completed={stats.completed} total={stats.total} />
          </div>
        </div>

        {/* Personalization Info Banner */}
        {showPersonalizationInfo && personalizedData && personalizedData.userProfile && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-start gap-3">
              <Sparkles size={24} className="flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">Your Personalized Roadmap is Ready! 🎉</h3>
                <div className="space-y-1 text-sm opacity-90">
                  <p>• Focus: <strong>{personalizedData.userProfile.danceStyle?.replace('-', ' ')}</strong></p>
                  <p>• Level: <strong>{personalizedData.userProfile.experienceLevel?.replace('-', ' ')}</strong></p>
                  <p>• Time: <strong>{personalizedData.userProfile.weeklyHours} hours/week</strong></p>
                  <p>• Recommended: Practice <strong>{personalizedData.recommendedPerWeek} skills per week</strong></p>
                  <p>• Estimated completion: <strong>{personalizedData.estimatedWeeks} weeks</strong></p>
                </div>
                
                {personalizedData.goalRecommendations && personalizedData.goalRecommendations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="font-semibold mb-2">Tips for your goals:</p>
                    <ul className="space-y-1 text-sm">
                      {personalizedData.goalRecommendations.map((rec, index) => (
                        <li key={index}>• {rec.message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowPersonalizationInfo(false)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Roadmap - 2/3 width */}
          <div className="lg:col-span-2">
            <RoadmapView categories={displayCategories} onSkillClick={onSkillClick} />
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <MilestoneCard milestones={milestones} currentPercentage={stats.percentage} />
            
            {/* Recommended This Week */}
            {personalizedData && personalizedData.recommendedPerWeek && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended This Week</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="text-sm text-gray-600">Target Skills</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {personalizedData.recommendedPerWeek}
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-600">Progress</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.completed} / {stats.total}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;