import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import RoadmapPage from './pages/RoadmapPage';
import SkillDetail from './pages/SkillDetail';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === 'home' && <Home />}
      {currentPage === 'roadmap' && (
        !selectedSkill
          ? <RoadmapPage onSelectSkill={setSelectedSkill} />
          : <SkillDetail skill={selectedSkill} onBack={() => setSelectedSkill(null)} />
      )}
      {currentPage === 'profile' && <Profile />}
    </>
  );
}

export default App;
