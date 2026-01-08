import roadmapData from '../utils/roadmapData';
import DifficultyBadge from '../components/common/DifficultyBadge';

export default function Home({ progressPercent }) {
  const totalSkills = roadmapData.categories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const completedSkills = roadmapData.categories.reduce(
    (sum, cat) => sum + cat.skills.filter(s => s.completed).length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Master Hip-Hop Dance
          <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Step by Step
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your structured roadmap to learning hip-hop fundamentals. From rhythm to freestyle, we've got you covered.
        </p>
        <button
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
        >
          Start Learning
        </button>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {roadmapData.categories.length}
          </div>
          <div className="text-gray-600">Categories</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            {totalSkills}
          </div>
          <div className="text-gray-600">Skills to Master</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            {progressPercent}%
          </div>
          <div className="text-gray-600">Your Progress</div>
        </div>
      </div>

      {/* Learning Path Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapData.categories.map(category => (
            <div
              key={category.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} mb-4`}></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <DifficultyBadge difficulty={category.difficulty} />
                <span className="text-sm text-gray-500">{category.skills.length} skills</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
