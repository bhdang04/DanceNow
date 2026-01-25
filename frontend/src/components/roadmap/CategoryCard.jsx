// CategoryCard.jsx
import { useState } from 'react';
import DifficultyBadge from '../common/DifficultyBadge';

export default function CategoryCard({ category, onSkillClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const skillCount = category.skills?.length || 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden">
      {/* Category Header - Clickable */}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} mb-4`}></div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
        <p className="text-gray-600 mb-4">{category.description}</p>
        
        <div className="flex items-center justify-between">
          <DifficultyBadge difficulty={category.difficulty} />
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {skillCount} skill{skillCount !== 1 ? 's' : ''}
            </span>
            <button 
              className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <>
                  Hide
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  View
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Skills List */}
      {isExpanded && category.skills && category.skills.length > 0 && (
        <div className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
          <div className="p-4 space-y-2">
            {category.skills.map((skill, skillIdx) => (
              <button
                key={skill.id || skillIdx}
                onClick={() => onSkillClick && onSkillClick(skill)}
                className="w-full text-left flex items-start justify-between p-4 bg-white rounded-lg hover:shadow-md hover:border-purple-300 border-2 border-gray-200 transition-all group"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                    {skill.title}
                  </h4>
                  
                  {skill.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {skill.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {skill.duration && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{skill.duration}</span>
                      </div>
                    )}
                    
                    {skill.keyPoints && skill.keyPoints.length > 0 && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{skill.keyPoints.length} tips</span>
                      </div>
                    )}

                    {skill.videoUrl && (
                      <div className="flex items-center gap-1 text-purple-600 font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Video</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Difficulty Badge */}
                {skill.difficulty && (
                  <div className="flex-shrink-0">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                      skill.difficulty.toLowerCase() === 'beginner' 
                        ? 'bg-green-100 text-green-700'
                        : skill.difficulty.toLowerCase() === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {skill.difficulty}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}