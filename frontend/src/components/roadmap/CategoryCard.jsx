import React from 'react';
import DifficultyBadge from '../common/DifficultyBadge';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} mb-4`}></div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
      <p className="text-gray-600 mb-4">{category.description}</p>
      <div className="flex items-center justify-between">
        <DifficultyBadge difficulty={category.difficulty} />
        <span className="text-sm text-gray-500">{category.skills.length} skills</span>
      </div>
    </div>
  );
};