// RoadmapView.jsx
import React from 'react';
import SkillNode from './SkillNode';

const RoadmapView = ({ categories, onSkillClick }) => {
  console.log('RoadmapView rendering with', categories.length, 'categories');
  
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Skills Available</h3>
        <p className="text-gray-600">Please seed the database or adjust your personalization settings.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.map((category, catIndex) => {
        if (!category.skills || category.skills.length === 0) {
          console.warn(`Category ${category.title} has no skills`);
          return null;
        }

        console.log(`Rendering category: ${category.title} with ${category.skills.length} skills`);

        return (
          <div 
            key={category.id || catIndex} 
            className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${
              category.isPriority ? 'border-purple-400 shadow-purple-100' : 'border-gray-200'
            }`}
          >
            {/* Priority Badge */}
            {category.isPriority && (
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                <span>⭐</span>
                <span>{category.priorityMessage || 'Recommended Focus Area'}</span>
              </div>
            )}

            {/* Category Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: category.color || '#9333ea' }}
                />
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.skills.length} skill{category.skills.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {category.description && (
                <p className="text-gray-600 text-sm ml-6">
                  {category.description}
                </p>
              )}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.skills.map((skill, skillIndex) => {
                console.log(`  - Rendering skill: ${skill.title}`);
                
                return (
                  <button
                    key={skill.id || `skill-${catIndex}-${skillIndex}`}
                    onClick={() => {
                      console.log('Skill clicked:', skill);
                      onSkillClick(skill);
                    }}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group text-left w-full"
                  >
                    {/* Skill Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors flex-1">
                        {skill.title}
                      </h3>
                      
                      {/* Difficulty Badge */}
                      {skill.difficulty && (
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                          skill.difficulty.toLowerCase() === 'beginner' 
                            ? 'bg-green-100 text-green-700'
                            : skill.difficulty.toLowerCase() === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {skill.difficulty}
                        </span>
                      )}
                    </div>
                    
                    {/* Skill Description */}
                    {skill.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {skill.description}
                      </p>
                    )}
                    
                    {/* Skill Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
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
                          <span>{skill.keyPoints.length} key points</span>
                        </div>
                      )}

                      {skill.videoUrl && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Video</span>
                        </div>
                      )}
                    </div>

                    {/* Click indicator */}
                    <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-purple-600 font-medium flex items-center gap-1">
                        Click to learn more
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoadmapView;