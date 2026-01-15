import React from 'react';
import { Play, Check, Lock } from 'lucide-react';
import DifficultyBadge from '../common/DifficultyBadge';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';

const SkillNode = ({ skill, onClick }) => {
  const { isSkillCompleted } = useProgress();
  const { isAuthenticated } = useAuth();
  
  const completed = isAuthenticated ? isSkillCompleted(skill.id) : false;
  const locked = skill.locked || false;

  return (
    <button
      onClick={() => !locked && onClick(skill)}
      disabled={locked}
      className={`text-left p-4 rounded-xl border-2 transition-all ${
        locked
          ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
          : completed
          ? 'bg-green-50 border-green-300 hover:border-green-400'
          : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          locked ? 'bg-gray-200' :
          completed ? 'bg-green-500' :
          'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}>
          {locked ? (
            <Lock size={20} className="text-gray-500" />
          ) : completed ? (
            <Check size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white" />
          )}
        </div>
        <span className="text-xs text-gray-500">{skill.duration}</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{skill.title}</h3>
      <DifficultyBadge difficulty={skill.difficulty} />
    </button>
  );
};

export default SkillNode;