import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import RoadmapPage from './pages/RoadmapPage';
import SkillDetail from './pages/SkillDetail';
import Profile from './pages/Profile';
import About from './pages/About';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import OnboardingQuiz from './components/onboarding/OnboardingQuiz';
import { AuthProvider } from './context/AuthContext';
import { SkillsProvider } from './context/SkillsContext';
import { ProgressProvider } from './context/ProgressContext';
import { generatePersonalizedRoadmap } from './utils/personalization';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [personalizedData, setPersonalizedData] = useState(null);

  // Check if user has completed onboarding
  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    } else {
      const savedPersonalization = localStorage.getItem('personalizedRoadmap');
      if (savedPersonalization) {
        setPersonalizedData(JSON.parse(savedPersonalization));
      }
    }
  }, []);

  const handleOnboardingComplete = (answers) => {
    // This will be handled by RoadmapPage when it has access to skills
    localStorage.setItem('onboardingAnswers', JSON.stringify(answers));
    localStorage.setItem('onboardingComplete', 'true');
    setShowOnboarding(false);
    setCurrentPage('roadmap');
  };

  const handleSkillClick = (skill) => {
    console.log('App - Skill clicked:', skill);
    setSelectedSkill(skill);
  };

  const handleBackToRoadmap = () => {
    setSelectedSkill(null);
  };

  if (showOnboarding) {
    return <OnboardingQuiz onComplete={handleOnboardingComplete} />;
  }

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
        <RoadmapPage 
          onSkillClick={handleSkillClick}
          personalizedData={personalizedData}
          setPersonalizedData={setPersonalizedData}
        />
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