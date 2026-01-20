import React, { useMemo } from 'react';
import ProgressBar from '../components/common/ProgressBar';
import RoadmapView from '../components/roadmap/RoadmapView';
import { useSkills } from '../context/SkillsContext';
import { useProgress } from '../context/ProgressContext';

const RoadmapPage = ({ onSkillClick }) => {
  const { categories, loading: skillsLoading, getTotalSkills } = useSkills();
  const { calculateStats, progress, loading: progressLoading } = useProgress();

  // Calculate stats with total from skills
  const stats = useMemo(() => {
    const totalSkills = getTotalSkills();
    return calculateStats(totalSkills);
  }, [progress, categories]);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Roadmap</h1>
          <p className="text-gray-600">Follow the path to master hip-hop fundamentals</p>
          
          <div className="mt-6">
            <ProgressBar completed={stats.completed} total={stats.total} />
          </div>
        </div>

        <RoadmapView categories={categories} onSkillClick={onSkillClick} />
      </div>
    </div>
  );
};

export default RoadmapPage;