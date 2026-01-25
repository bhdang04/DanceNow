import React, { useMemo } from 'react';
import CategoryCard from '../components/roadmap/CategoryCard';
import { useSkills } from '../context/SkillsContext';
import { useProgress } from '../context/ProgressContext';

const Home = ({ setCurrentPage, onSkillClick }) => {
  const { categories, loading: skillsLoading, getTotalSkills } = useSkills();
  const { calculateStats, progress } = useProgress();

  // Calculate stats with total from skills
  const stats = useMemo(() => {
    const totalSkills = getTotalSkills();
    return calculateStats(totalSkills);
  }, [progress, categories, getTotalSkills, calculateStats]);

  if (skillsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Hip-Hop Dance
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Step by Step
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your structured roadmap to learning hip-hop fundamentals. From rhythm to freestyle, we've got you covered.
          </p>
          <button
            onClick={() => setCurrentPage('roadmap')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Start Learning
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {categories.length}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {stats.total}
            </div>
            <div className="text-gray-600">Skills to Master</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {stats.percentage}%
            </div>
            <div className="text-gray-600">Your Progress</div>
          </div>
        </div>

        {/* Categories Preview */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Explore All Skills
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Click on any category to explore the skills you can learn. Get your personalized roadmap by clicking "Start Learning" above.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onSkillClick={onSkillClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;