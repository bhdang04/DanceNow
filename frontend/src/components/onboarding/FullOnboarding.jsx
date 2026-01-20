import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const FullOnboarding = ({ miniAnswers, onComplete }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    ...miniAnswers, // Include the 3 mini answers
    weeklyHours: '',
    goals: [miniAnswers.primaryGoal], // Start with their primary goal
    practiceEnvironment: ''
  });

  const totalSteps = 2; // Only 2 more questions

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const toggleGoal = (goal) => {
    setAnswers(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return answers.weeklyHours !== '';
      case 2: return answers.practiceEnvironment !== '';
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Let's finish setting up 🎯
          </h1>
          <p className="text-gray-600">Just 2 more questions to optimize your plan</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
            <span className="text-sm text-purple-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                How much time can you commit?
              </h2>
              <p className="text-gray-600 mb-6">We'll pace your roadmap accordingly</p>
              
              <div className="space-y-3">
                {[
                  { value: '1-3', label: '1-3 hours/week', desc: 'Casual, at your own pace', icon: '🌙' },
                  { value: '3-5', label: '3-5 hours/week', desc: 'Regular, steady progress', icon: '⭐' },
                  { value: '5-10', label: '5-10 hours/week', desc: 'Serious, fast improvement', icon: '🔥' },
                  { value: '10+', label: '10+ hours/week', desc: 'Dedicated, rapid mastery', icon: '🚀' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, weeklyHours: option.value })}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers.weeklyHours === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Where will you practice?
              </h2>
              <p className="text-gray-600 mb-6">We'll recommend skills that fit your space</p>
              
              <div className="space-y-3">
                {[
                  { value: 'home-small', label: '🏠 Home (Small Space)', desc: 'Bedroom, apartment' },
                  { value: 'home-large', label: '🏡 Home (Large Space)', desc: 'Garage, basement, big room' },
                  { value: 'studio', label: '🎬 Dance Studio', desc: 'Access to proper studio' },
                  { value: 'anywhere', label: '🌍 Anywhere', desc: 'I adapt to any space' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, practiceEnvironment: option.value })}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers.practiceEnvironment === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold text-lg text-gray-900 mb-1">{option.label}</div>
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
                className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === totalSteps ? 'Complete Setup' : 'Continue'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullOnboarding;