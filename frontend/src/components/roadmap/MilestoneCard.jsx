import React from 'react';
import { Trophy, Star } from 'lucide-react';

const MilestoneCard = ({ milestones, currentPercentage }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-yellow-500" size={24} />
        <h3 className="text-lg font-bold text-gray-900">Milestones</h3>
      </div>
      
      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const isAchieved = currentPercentage >= milestone.percentage;
          const isCurrent = currentPercentage < milestone.percentage && 
                           (index === 0 || currentPercentage >= milestones[index - 1].percentage);
          
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all ${
                isAchieved
                  ? 'border-green-400 bg-green-50'
                  : isCurrent
                  ? 'border-purple-400 bg-purple-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isAchieved && <Star className="text-yellow-500 fill-yellow-500" size={20} />}
                  <span className="font-semibold text-gray-900">{milestone.title}</span>
                </div>
                <span className={`text-sm font-medium ${
                  isAchieved ? 'text-green-600' : isCurrent ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {milestone.percentage}%
                </span>
              </div>
              <p className="text-sm text-gray-600">{milestone.description}</p>
              
              {isAchieved && (
                <div className="mt-2 text-xs text-green-600 font-medium">✓ Achieved!</div>
              )}
              {isCurrent && (
                <div className="mt-2 text-xs text-purple-600 font-medium">→ Current Goal</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneCard;