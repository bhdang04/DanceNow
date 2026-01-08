import React from 'react';
import { roadmapData } from '../utils/roadmapData';

const Profile = ({ totalSkills, completedSkills, progressPercent }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Progress</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">{completedSkills}</div>
            <div className="text-gray-600">Skills Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalSkills - completedSkills}</div>
            <div className="text-gray-600">Skills Remaining</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-1">{progressPercent}%</div>
            <div className="text-gray-600">Overall Progress</div>
          </div>
        </div>

        {/* Category Progress */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Progress by Category</h2>
          <div className="space-y-6">
            {roadmapData.categories.map((category) => {
              const categoryCompleted = category.skills.filter(s => s.completed).length;
              const categoryTotal = category.skills.length;
              const categoryPercent = Math.round((categoryCompleted / categoryTotal) * 100);

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