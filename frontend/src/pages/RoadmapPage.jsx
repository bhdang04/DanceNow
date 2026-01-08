import ProgressBar from '../components/common/ProgressBar';
import RoadmapView from '../components/roadmap/RoadmapView';
import { roadmapData } from '../utils/roadmapData';

const RoadmapPage = ({ totalSkills, completedSkills, onSkillClick }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Roadmap</h1>
          <p className="text-gray-600">Follow the path to master hip-hop fundamentals</p>
          
          <div className="mt-6">
            <ProgressBar completed={completedSkills} total={totalSkills} />
          </div>
        </div>

        <RoadmapView categories={roadmapData.categories} onSkillClick={onSkillClick} />
      </div>
    </div>
  );
};

export default RoadmapPage;