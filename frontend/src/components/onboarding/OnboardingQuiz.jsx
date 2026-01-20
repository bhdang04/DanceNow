import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const OnboardingQuiz = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    danceStyle: '',
    experienceLevel: '',
    weeklyHours: '',
    goals: []
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
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
      case 1: return answers.danceStyle !== '';
      case 2: return answers.experienceLevel !== '';
      case 3: return answers.weeklyHours !== '';
      case 4: return answers.goals.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What style interests you most?</h2>
              <p className="text-gray-600 mb-6">We'll tailor your roadmap based on your interests</p>
              
              <div className="space-y-3">
                {[
                  { value: 'all-around', label: 'All-Around Hip-Hop', desc: 'Learn all the fundamentals' },
                  { value: 'freestyle', label: 'Freestyle Focus', desc: 'Express yourself through improv' },
                  { value: 'choreography', label: 'Choreography', desc: 'Learn routines and combos' },
                  { value: 'breaking', label: 'Breaking/B-boying', desc: 'Power moves and foundation' },
                  { value: 'popping-locking', label: 'Popping & Locking', desc: 'Funk styles and hits' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, danceStyle: option.value })}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers.danceStyle === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your experience level?</h2>
              <p className="text-gray-600 mb-6">This helps us set the right difficulty</p>
              
              <div className="space-y-3">
                {[
                  { value: 'complete-beginner', label: 'Complete Beginner', desc: 'Never danced before' },
                  { value: 'some-experience', label: 'Some Experience', desc: '1-6 months of practice' },
                  { value: 'intermediate', label: 'Intermediate', desc: '6 months - 2 years' },
                  { value: 'advanced', label: 'Advanced', desc: '2+ years, looking to refine' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, experienceLevel: option.value })}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers.experienceLevel === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">How much time can you commit?</h2>
              <p className="text-gray-600 mb-6">Weekly practice hours</p>
              
              <div className="space-y-3">
                {[
                  { value: '1-3', label: '1-3 hours/week', desc: 'Casual learner' },
                  { value: '3-5', label: '3-5 hours/week', desc: 'Regular practice' },
                  { value: '5-10', label: '5-10 hours/week', desc: 'Serious student' },
                  { value: '10+', label: '10+ hours/week', desc: 'Dedicated dancer' }
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
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What are your goals?</h2>
              <p className="text-gray-600 mb-6">Select all that apply</p>
              
              <div className="space-y-3">
                {[
                  { value: 'freestyle', label: 'Master Freestyle', desc: 'Improvise confidently' },
                  { value: 'battles', label: 'Enter Battles', desc: 'Compete and win' },
                  { value: 'choreography', label: 'Learn Choreography', desc: 'Perform routines' },
                  { value: 'fitness', label: 'Get Fit', desc: 'Health and exercise' },
                  { value: 'social', label: 'Social Dancing', desc: 'Cypher and community' },
                  { value: 'teach', label: 'Teach Others', desc: 'Share knowledge' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleGoal(option.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers.goals.includes(option.value)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                      {answers.goals.includes(option.value) && (
                        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
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
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === totalSteps ? 'Generate My Roadmap' : 'Continue'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuiz;