import React from 'react';

const PracticeDrills = ({ drills }) => {
  const defaultDrills = [
    {
      title: 'Drill 1: Count and Bounce',
      description: 'Count "1, 2, 3, 4" out loud while bouncing. Do this for 2 minutes straight.'
    },
    {
      title: 'Drill 2: Mirror Practice',
      description: 'Practice in front of a mirror to check your form and timing.'
    }
  ];

  const displayDrills = drills || defaultDrills;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Practice Drills</h2>
      <div className="space-y-3">
        {displayDrills.map((drill, index) => (
          <div key={index} className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-1">{drill.title}</h3>
            <p className="text-sm text-gray-600">{drill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeDrills;