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
          return null; // Skip empty categories
        }

        return (
          <div key={category.id} className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${
            category.isPriority ? 'border-purple-400' : 'border-gray-200'
          }`}>
            {/* ... rest of your category rendering code ... */}
          </div>
        );
      })}
    </div>
  );
};

export default RoadmapView;