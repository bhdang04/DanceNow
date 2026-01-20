import React from 'react';
import { Lock, Sparkles, CheckCircle } from 'lucide-react';

const RoadmapPreview = ({ miniAnswers, onSignup }) => {
  // Quick preview based on their 3 answers
  const getPreviewData = () => {
    const { danceStyle, experienceLevel, primaryGoal } = miniAnswers;
    
    const styleMap = {
      'all-around': 'All-Around Hip-Hop',
      'freestyle': 'Freestyle & Battles',
      'choreography': 'Choreography',
      'popping-locking': 'Popping & Locking'
    };

    const levelMap = {
      'complete-beginner': 'Beginner',
      'some-experience': 'Beginner-Intermediate',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };

    const estimatedSkills = experienceLevel === 'complete-beginner' ? 18 : 
                            experienceLevel === 'some-experience' ? 22 : 24;

    return {
      style: styleMap[danceStyle],
      level: levelMap[experienceLevel],
      estimatedSkills,
      weeklyRecommendation: experienceLevel === 'complete-beginner' ? 2 : 3,
      estimatedWeeks: Math.ceil(estimatedSkills / (experienceLevel === 'complete-beginner' ? 2 : 3))
    };
  };

  const preview = getPreviewData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 animate-bounce">
            <Sparkles className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Your Roadmap is Ready! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Personalized just for you based on your goals
          </p>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-2 border-purple-200">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Your Focus</div>
              <div className="text-2xl font-bold text-gray-900">{preview.style}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Your Level</div>
              <div className="text-2xl font-bold text-gray-900">{preview.level}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-1">{preview.estimatedSkills}</div>
              <div className="text-sm text-gray-600">Skills Selected</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-1">{preview.weeklyRecommendation}/week</div>
              <div className="text-sm text-gray-600">Recommended Pace</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-1">{preview.estimatedWeeks} weeks</div>
              <div className="text-sm text-gray-600">To Complete</div>
            </div>
          </div>

          {/* Blurred Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-10 flex items-center justify-center">
              <div className="text-center bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-purple-200 shadow-lg">
                <Lock className="mx-auto mb-3 text-purple-600" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sign up to unlock</h3>
                <p className="text-gray-600 mb-4">Save your progress and access your full roadmap</p>
                <button
                  onClick={onSignup}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  Create Free Account
                </button>
              </div>
            </div>
            
            {/* Blurred Roadmap Preview */}
            <div className="filter blur-sm opacity-50 pointer-events-none">
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-100 rounded-lg h-24"></div>
                  <div className="p-3 bg-gray-100 rounded-lg h-24"></div>
                  <div className="p-3 bg-gray-100 rounded-lg h-24"></div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">What you'll get with an account:</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Track your progress across all skills',
              'Unlock achievement badges & milestones',
              'Get personalized recommendations',
              'Access on any device, anytime',
              'Join the community (coming soon)',
              'Completely free, forever'
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <button
            onClick={onSignup}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Create My Free Account →
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Already have an account? <button onClick={onSignup} className="text-purple-600 font-semibold">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPreview;