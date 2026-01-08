// ============================================
// src/App.jsx
// ============================================
import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import RoadmapPage from './pages/RoadmapPage';
import SkillDetail from './pages/SkillDetail';
import Profile from './pages/Profile';
import About from './pages/About';
import { roadmapData } from './utils/roadmapData';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate progress stats
  const totalSkills = roadmapData.categories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const completedSkills = roadmapData.categories.reduce(
    (sum, cat) => sum + cat.skills.filter(s => s.completed).length, 0
  );
  const progressPercent = Math.round((completedSkills / totalSkills) * 100);

  // Handlers
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleBackToRoadmap = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      {currentPage === 'home' && (
        <Home 
          setCurrentPage={setCurrentPage}
          totalSkills={totalSkills}
          completedSkills={completedSkills}
          progressPercent={progressPercent}
        />
      )}
      
      {currentPage === 'roadmap' && !selectedSkill && (
        <RoadmapPage 
          totalSkills={totalSkills}
          completedSkills={completedSkills}
          onSkillClick={handleSkillClick}
        />
      )}
      
      {currentPage === 'roadmap' && selectedSkill && (
        <SkillDetail 
          skill={selectedSkill}
          onBack={handleBackToRoadmap}
        />
      )}
      
      {currentPage === 'profile' && (
        <Profile 
          totalSkills={totalSkills}
          completedSkills={completedSkills}
          progressPercent={progressPercent}
        />
      )}
      
      {currentPage === 'about' && <About />}
      
      <Footer />
    </div>
  );
};

export default App;