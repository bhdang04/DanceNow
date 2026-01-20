import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import DifficultyBadge from '../common/DifficultyBadge';
import VideoPlayer from './VideoPlayer';
import KeyPoints from './KeyPoints';
import CommonMistakes from './CommonMistakes';
import PracticeDrills from './PracticeDrills';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';

const SkillPage = ({ skill, onBack }) => {
  const { isSkillCompleted, toggleComplete, progress } = useProgress();
  const { isAuthenticated } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Add this line to verify component renders
  console.log('🎯 SkillPage component rendered!');
  
  if (!skill) {
    console.log('❌ No skill provided to SkillPage');
    return null;
  }

  console.log('✅ SkillPage has skill:', skill);

  // Use either skill.id or skill.skillId
  const skillId = skill.id || skill.skillId;
  
  console.log('📝 Skill ID:', skillId);
  console.log('📊 Current progress array:', progress);
  
  const completed = isAuthenticated ? isSkillCompleted(skillId) : false;
  
  console.log('✓ Is completed:', completed);

  const handleToggleComplete = () => {
    console.log('🔘 BUTTON CLICKED!'); // This should appear first
    alert('Button was clicked!'); // Visual confirmation
    
    if (!isAuthenticated) {
      console.log('❌ Not authenticated');
      alert('Please login to track your progress');
      return;
    }

    setIsUpdating(true);
    
    console.log('=== TOGGLING COMPLETION ===');
    console.log('Skill ID being sent:', skillId);
    console.log('Current completed status:', completed);
    
    toggleComplete(skillId)
      .then(() => {
        console.log('✅ Toggle completed successfully!');
      })
      .catch((error) => {
        console.error('❌ Failed to update progress:', error);
        alert('Failed to update progress: ' + error.message);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronRight size={20} className="rotate-180" />
          Back to Roadmap
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${skill.categoryColor} p-8 text-white`}>
            <div className="flex items-center gap-3 mb-4">
              <DifficultyBadge difficulty={skill.difficulty} />
              <span className="text-sm opacity-90">{skill.duration}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{skill.title}</h1>
            <p className="opacity-90">{skill.description || 'Master this fundamental technique'}</p>
          </div>

          <VideoPlayer videoUrl={skill.videoUrl} />

          {/* Content */}
          <div className="p-8">
            {/* Debug info */}
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
              <div><strong>Debug Info:</strong></div>
              <div>Skill ID: <code>{skillId}</code></div>
              <div>Authenticated: {isAuthenticated ? '✓ Yes' : '✗ No'}</div>
              <div>Completed: {completed ? '✓ Yes' : '✗ No'}</div>
              <div>Updating: {isUpdating ? '⏳ Yes' : '✗ No'}</div>
            </div>

            <button 
              onClick={handleToggleComplete}
              disabled={isUpdating}
              className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all ${
                isUpdating 
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : completed 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
              }`}
            >
              {isUpdating ? '⏳ Updating...' : completed ? '✓ Completed' : '➕ Mark as Complete'}
            </button>

            <div className="space-y-8">
              <KeyPoints points={skill.keyPoints} />
              <CommonMistakes mistakes={skill.commonMistakes} />
              <PracticeDrills drills={skill.practiceDrills} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillPage;