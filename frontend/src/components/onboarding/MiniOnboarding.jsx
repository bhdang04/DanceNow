// MiniOnboarding.jsx
import React, { useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

const MiniOnboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    danceStyle: '',
    experienceLevel: '',
    primaryGoal: ''
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return answers.danceStyle !== '';
      case 2: return answers.experienceLevel !== '';
      case 3: return answers.primaryGoal !== '';
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              <Sparkles className="inline mr-2" size={16} />
              Quick Personalization ({step}/3)
            </span>
            <span className="text-sm text-purple-600 font-medium">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What brings you here?
              </h2>
              <p className="text-gray-600 mb-6">Choose your main interest</p>
              
              <div className="space-y-3">
                {[
                  { 
                    value: 'all-around', 
                    label: '🎯 All-Around Hip-Hop', 
                    desc: 'Learn everything from scratch',
                    popular: true
                  },
                  { 
                    value: 'freestyle', 
                    label: '🎤 Freestyle & Battles', 
                    desc: 'Express yourself, win cyphers' 
                  },
                  { 
                    value: 'choreography', 
                    label: '💃 Choreography', 
                    desc: 'Master routines and performances' 
                  },
                  { 
                    value: 'popping-locking', 
                    label: '🤖 Popping & Locking', 
                    desc: 'Funk styles and foundation' 
                  }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, danceStyle: option.value })}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all relative ${
                      answers.danceStyle === option.value
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                    }`}
                  >
                    {option.popular && answers.danceStyle !== option.value && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                        POPULAR
                      </span>
                    )}
                    <div className="font-bold text-lg text-gray-900 mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Have you danced before?
              </h2>
              <p className="text-gray-600 mb-6">We'll match you with the right level</p>
              
              <div className="space-y-3">
                {[
                  { 
                    value: 'complete-beginner', 
                    label: '🌱 Complete Beginner', 
                    desc: 'Never danced, start from zero',
                    recommended: true
                  },
                  { 
                    value: 'some-experience', 
                    label: '🎓 Some Experience', 
                    desc: '1-6 months of dabbling' 
                  },
                  { 
                    value: 'intermediate', 
                    label: '⭐ Intermediate', 
                    desc: '6+ months, know the basics' 
                  },
                  { 
                    value: 'advanced', 
                    label: '👑 Advanced', 
                    desc: '2+ years, ready to master' 
                  }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, experienceLevel: option.value })}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all relative ${
                      answers.experienceLevel === option.value
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                    }`}
                  >
                    {option.recommended && answers.experienceLevel !== option.value && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        MOST COMMON
                      </span>
                    )}
                    <div className="font-bold text-lg text-gray-900 mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What's your main goal?
              </h2>
              <p className="text-gray-600 mb-6">We'll prioritize what matters to you</p>
              
              <div className="space-y-3">
                {[
                  { 
                    value: 'freestyle', 
                    label: '🎤 Master Freestyle', 
                    desc: 'Improvise confidently anywhere' 
                  },
                  { 
                    value: 'battles', 
                    label: '⚔️ Win Battles', 
                    desc: 'Compete and dominate',
                    hot: true
                  },
                  { 
                    value: 'choreography', 
                    label: '🎬 Learn Choreography', 
                    desc: 'Perform clean routines' 
                  },
                  { 
                    value: 'fitness', 
                    label: '💪 Get Fit', 
                    desc: 'Health, cardio, fun workout' 
                  },
                  { 
                    value: 'social', 
                    label: '🤝 Social Dancing', 
                    desc: 'Cyphers and community vibes' 
                  }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, primaryGoal: option.value })}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all relative ${
                      answers.primaryGoal === option.value
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                    }`}
                  >
                    {option.hot && answers.primaryGoal !== option.value && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        🔥 HOT
                      </span>
                    )}
                    <div className="font-bold text-lg text-gray-900 mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === totalSteps ? (
                <>
                  <Sparkles size={20} />
                  See My Roadmap
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-6 text-sm text-gray-500">
          ✓ Free forever · ✓ No credit card · ✓ Takes 30 seconds
        </div>
      </div>
    </div>
  );
};

export default MiniOnboarding;