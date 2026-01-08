import React from 'react';

const KeyPoints = ({ points }) => {
  const defaultPoints = [
    'Stay relaxed and let the music guide your movement',
    'Focus on the downbeat (the "1" in the count)',
    'Practice with slower tempo music first'
  ];

  const displayPoints = points || defaultPoints;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Key Points to Focus On</h2>
      <ul className="space-y-2 text-gray-700">
        {displayPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-purple-600 mt-1">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyPoints;