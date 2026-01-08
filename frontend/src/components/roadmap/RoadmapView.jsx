import React from 'react';
import SkillNode from './SkillNode';
import DifficultyBadge from '../common/DifficultyBadge';

const RoadmapView = ({ categories, onSkillClick }) => {
  return (
    <div className="space-y-8">
      {categories.map((category, catIndex) => (
        <div key={category.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white font-bold text-xl`}>
              {catIndex + 1}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{category.title}</h2>
              <p className="text-gray-600 mb-2">{category.description}</p>
              <DifficultyBadge difficulty={category.difficulty} />
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.skills.map((skill) => (
              <SkillNode 
                key={skill.id} 
                skill={skill} 
                onClick={(skill) => onSkillClick({ ...skill, categoryColor: category.color })}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapView;