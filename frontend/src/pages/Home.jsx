import CategoryCard from '../components/roadmap/CategoryCard';
import { roadmapData } from '../utils/roadmapData';

const Home = ({ setCurrentPage, totalSkills, completedSkills, progressPercent }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl leading-tight font-bold text-gray-900 mb-6 pb-2">
            Master Hip-Hop Dance
            <span className="block leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Step by Step
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your structured roadmap to learning hip-hop fundamentals. From rhythm to freestyle, we've got you covered.
          </p>
          <button
            onClick={() => setCurrentPage('roadmap')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Start Learning
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
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

        {/* Categories Preview */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmapData.categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;