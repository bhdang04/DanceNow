import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import RoadmapPage from './pages/RoadmapPage';
import SkillDetail from './pages/SkillDetail';
import Profile from './pages/Profile';
import About from './pages/About';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { AuthProvider } from './context/AuthContext';
import { SkillsProvider } from './context/SkillsContext';
import { ProgressProvider } from './context/ProgressContext';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSkillClick = (skill) => {
    console.log('App - Skill clicked:', skill); // Debug
    setSelectedSkill(skill);
    console.log('App - selectedSkill state set to:', skill); // Debug
  };

  const handleBackToRoadmap = () => {
    console.log('App - Going back to roadmap'); // Debug
    setSelectedSkill(null);
  };

  console.log('App - Current state:', { currentPage, selectedSkill }); // Debug

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      
      {currentPage === 'roadmap' && !selectedSkill && (
        <RoadmapPage onSkillClick={handleSkillClick} />
      )}
      
      {currentPage === 'roadmap' && selectedSkill && (
        <SkillDetail 
          skill={selectedSkill}
          onBack={handleBackToRoadmap}
        />
      )}
      
      {currentPage === 'profile' && <Profile />}
      
      {currentPage === 'about' && <About />}
      
      {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
      
      {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} />}
      
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <SkillsProvider>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </SkillsProvider>
    </AuthProvider>
  );
};

export default App;