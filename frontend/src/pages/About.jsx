// ============================================
// src/pages/About.jsx
// ============================================
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About HipHop Roadmap</h1>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <p className="text-lg text-gray-700 mb-4">
            HipHop Roadmap is your structured guide to mastering hip-hop dance fundamentals.
          </p>
          <p className="text-gray-600 mb-4">
            Whether you're a complete beginner or looking to refine your skills, our platform
            provides a clear path from basic rhythm to advanced techniques.
          </p>
          <p className="text-gray-600 mb-6">
            Built with passion for dance education and powered by modern web technologies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            To make quality hip-hop dance education accessible to everyone, breaking down complex
            movements into achievable steps and providing a clear roadmap for progression.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">What You'll Learn</h2>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Fundamental rhythm and musicality skills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Core grooves and basic steps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Body isolation techniques</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Foundation styles like popping and locking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Freestyle basics and musicality application</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Get Started</h2>
          <p className="text-gray-600 mb-4">
            Ready to begin your hip-hop journey? Head over to the roadmap and start with the
            Rhythm & Musicality category. Take it one skill at a time, practice consistently,
            and watch your progress grow!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;