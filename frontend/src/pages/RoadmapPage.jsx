import React, { useMemo, useEffect, useState } from 'react';
import ProgressBar from '../components/common/ProgressBar';
import RoadmapView from '../components/roadmap/RoadmapView';
import MilestoneCard from '../components/roadmap/MilestoneCard';
import { useSkills } from '../context/SkillsContext';
import { useProgress } from '../context/ProgressContext';
import { RefreshCw, Sparkles } from 'lucide-react';

const RoadmapPage = ({ onSkillClick, personalizedData, onResetPersonalization }) => {
  const { categories: allCategories, loading: skillsLoading } = useSkills();
  const { calculateStats, progress, loading: progressLoading } = useProgress();

  const [displayCategories, setDisplayCategories] = useState([]);
  const [showPersonalizationInfo, setShowPersonalizationInfo] = useState(false);

  // ✅ Normalize personalization ONCE
  const roadmap = personalizedData?.generatedRoadmap ?? null;

  // Generate milestones locally
  const generateMilestones = (totalSkills) => [
    { percentage: 25, title: 'Foundation Builder', description: "You've mastered the basics!", icon: '🌱' },
    { percentage: 50, title: 'Intermediate Dancer', description: 'Halfway to mastery!', icon: '🔥' },
    { percentage: 75, title: 'Advanced Student', description: 'Almost there, keep pushing!', icon: '⭐' },
    { percentage: 100, title: 'Hip-Hop Master', description: 'You did it! Now teach others!', icon: '👑' }
  ];

  // Load personalized roadmap OR default
  useEffect(() => {
    if (!skillsLoading && allCategories.length > 0) {
      console.log('=== ROADMAP PAGE DEBUG ===');
      console.log('All categories from backend:', allCategories.length);
      
      if (personalizedData && personalizedData.categories) {
        console.log('✅ Using personalized roadmap');
        console.log('Personalized categories:', personalizedData.categories.length);
        
        personalizedData.categories.forEach((cat, idx) => {
          console.log(`  ${idx + 1}. ${cat.title}: ${cat.skills?.length || 0} skills`);
          if (cat.skills?.length > 0) {
            console.log('     Skills:', cat.skills.map(s => s.title).join(', '));
          }
        });
        
        setDisplayCategories(personalizedData.categories);
        setShowPersonalizationInfo(true);
      } else {
        console.log('⚠️ No personalized data, using all categories');
        console.log('All categories:', allCategories.length);
        
        allCategories.forEach((cat, idx) => {
          console.log(`  ${idx + 1}. ${cat.title}: ${cat.skills?.length || 0} skills`);
        });
        
        setDisplayCategories(allCategories);
        setShowPersonalizationInfo(false);
      }
    }
  }, [skillsLoading, allCategories, personalizedData]);
  
  // Stats
  const stats = useMemo(() => {
    const totalSkills = displayCategories.reduce(
      (sum, cat) => sum + (cat.skills?.length || 0),
      0
    );
    return calculateStats(totalSkills);
  }, [progress, displayCategories, calculateStats]);

  // Milestones
  const milestones = useMemo(() => {
    const totalSkills = displayCategories.reduce(
      (sum, cat) => sum + (cat.skills?.length || 0),
      0
    );
    return generateMilestones(totalSkills);
  }, [displayCategories]);

  // Reset personalization
  const handleResetPersonalization = () => {
    if (window.confirm('Are you sure you want to retake the personalization quiz?')) {
      onResetPersonalization();
    }
  };

  if (skillsLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Learning Roadmap
            </h1>

            {roadmap && (
              <button
                onClick={handleResetPersonalization}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
              >
                <RefreshCw size={16} />
                Retake Quiz
              </button>
            )}
          </div>

          <ProgressBar completed={stats.completed} total={stats.total} />
        </div>

        {/* 🎯 Personalization Banner */}
        {showPersonalizationInfo && roadmap?.userProfile && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white">
            <div className="flex gap-3">
              <Sparkles size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">
                  Your Personalized Roadmap is Ready 🎉
                </h3>
                <p>Focus: <strong>{roadmap.userProfile.danceStyle}</strong></p>
                <p>Level: <strong>{roadmap.userProfile.experienceLevel}</strong></p>
                <p>Time: <strong>{roadmap.userProfile.weeklyHours} hrs/week</strong></p>
                <p>
                  Recommended: <strong>{roadmap.recommendedPerWeek}</strong> skills/week
                </p>
                <p>
                  Estimated completion: <strong>{roadmap.estimatedWeeks}</strong> weeks
                </p>
              </div>
              <button onClick={() => setShowPersonalizationInfo(false)}>✕</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RoadmapView categories={displayCategories} onSkillClick={onSkillClick} />
          </div>

          <div className="lg:col-span-1">
            <MilestoneCard
              milestones={milestones}
              currentPercentage={stats.percentage}
            />

            {roadmap && (
              <div className="bg-white rounded-xl p-6 border mt-6">
                <h3 className="font-bold mb-4">Recommended This Week</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {roadmap.recommendedPerWeek} skills
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Progress: {stats.completed} / {stats.total}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;