import React, { useMemo } from 'react';
import { useSkills } from '../context/SkillsContext';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { categories, getTotalSkills } = useSkills();
  const { calculateStats, progress } = useProgress();
  const { user } = useAuth();

  // Calculate stats with total from skills
  const stats = useMemo(() => {
    const totalSkills = getTotalSkills();
    return calculateStats(totalSkills);
  }, [progress, categories]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view your progress.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
        <p className="text-gray-600 mb-8">Welcome back, {user.username}!</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">{stats.completed}</div>
            <div className="text-gray-600">Skills Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.remaining}</div>
            <div className="text-gray-600">Skills Remaining</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.percentage}%</div>
            <div className="text-gray-600">Overall Progress</div>
          </div>
        </div>

        {/* Category Progress */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Progress by Category</h2>
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryProgress = progress.filter(p => 
                category.skills.some(s => s.id === p.skillId)
              );
              const categoryCompleted = categoryProgress.filter(p => p.completed).length;
              const categoryTotal = category.skills?.length || 0;
              const categoryPercent = categoryTotal > 0 
                ? Math.round((categoryCompleted / categoryTotal) * 100) 
                : 0;

              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{category.title}</span>
                    <span className="text-sm text-gray-600">{categoryCompleted}/{categoryTotal}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`bg-gradient-to-r ${category.color} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${categoryPercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;