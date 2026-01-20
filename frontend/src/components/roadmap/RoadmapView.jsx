import React from 'react';
import SkillNode from './SkillNode';
import DifficultyBadge from '../common/DifficultyBadge';
import { Star } from 'lucide-react';

const RoadmapView = ({ categories, onSkillClick }) => {
  return (
    <div className="space-y-8">
      {categories.map((category, catIndex) => (
        <div key={category.id} className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${
          category.isPriority ? 'border-purple-400' : 'border-gray-200'
        }`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white font-bold text-xl relative`}>
              {catIndex + 1}
              {category.isPriority && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star size={14} className="text-white fill-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                {category.isPriority && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    PRIORITY
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{category.description}</p>
              {category.isPriority && category.priorityMessage && (
                <p className="text-sm text-purple-600 font-medium">💡 {category.priorityMessage}</p>
              )}
              <div className="mt-2">
                <DifficultyBadge difficulty={category.difficulty} />
              </div>
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