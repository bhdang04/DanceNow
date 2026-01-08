import { Play, Check, Lock } from 'lucide-react';
import DifficultyBadge from '../common/DifficultyBadge';

const SkillNode = ({ skill, onClick }) => {
  return (
    <button
      onClick={() => !skill.locked && onClick(skill)}
      disabled={skill.locked}
      className={`text-left p-4 rounded-xl border-2 transition-all ${
        skill.locked
          ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
          : skill.completed
          ? 'bg-green-50 border-green-300 hover:border-green-400'
          : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          skill.locked ? 'bg-gray-200' :
          skill.completed ? 'bg-green-500' :
          'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}>
          {skill.locked ? (
            <Lock size={20} className="text-gray-500" />
          ) : skill.completed ? (
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