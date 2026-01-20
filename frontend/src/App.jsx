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
import MiniOnboarding from './components/onboarding/MiniOnboarding';
import RoadmapPreview from './components/onboarding/RoadmapPreview';
import FullOnboarding from './components/onboarding/FullOnboarding';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SkillsProvider } from './context/SkillsContext';
import { ProgressProvider } from './context/ProgressContext';
import { personalizationApi } from './utils/personalization';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Onboarding state
  const [onboardingStage, setOnboardingStage] = useState(null); // null, 'mini', 'preview', 'full', 'complete'
  const [miniAnswers, setMiniAnswers] = useState(null);
  const [personalizedData, setPersonalizedData] = useState(null);
  
  const { isAuthenticated, user, loading: authLoading } = useAuth();

  // Check onboarding status on mount
  useEffect(() => {
    if (authLoading) return;

    const checkOnboardingStatus = async () => {
      if (isAuthenticated) {
        // User is logged in - check if they have personalization saved
        try {
          const response = await personalizationApi.get();
          if (response.personalization) {
            setPersonalizedData(response.personalization);
            setOnboardingStage('complete');
          } else {
            // Logged in but no personalization - check if they did mini onboarding
            const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
            if (savedMiniAnswers) {
              setMiniAnswers(JSON.parse(savedMiniAnswers));
              setOnboardingStage('full'); // Show full onboarding
            } else {
              setOnboardingStage('mini'); // Start from scratch
            }
          }
        } catch (error) {
          console.error('Error loading personalization:', error);
          // No personalization found - start onboarding
          setOnboardingStage('mini');
        }
      } else {
        // Not logged in - check if they've done mini onboarding
        const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
        if (savedMiniAnswers) {
          setMiniAnswers(JSON.parse(savedMiniAnswers));
          setOnboardingStage('preview'); // Show preview and signup gate
        } else {
          setOnboardingStage('mini'); // Start mini onboarding
        }
      }
    };

    checkOnboardingStatus();
  }, [isAuthenticated, authLoading]);

  // Handle mini onboarding complete (3 questions)
  const handleMiniOnboardingComplete = (answers) => {
    console.log('Mini onboarding complete:', answers);
    setMiniAnswers(answers);
    localStorage.setItem('miniOnboardingAnswers', JSON.stringify(answers));
    setOnboardingStage('preview'); // Show preview and ask to signup
  };

  // Handle signup from preview
  const handleSignupFromPreview = () => {
    setCurrentPage('signup');
    setOnboardingStage(null); // Temporarily hide onboarding
  };

  // Handle full onboarding complete (after signup)
  const handleFullOnboardingComplete = async (fullAnswers) => {
    console.log('Full onboarding complete:', fullAnswers);
    
    try {
      // Save BOTH the answers AND generated roadmap to backend
      const personalizationData = {
        answers: fullAnswers, // Raw answers
        generatedRoadmap: null, // Will be generated on backend or frontend
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const response = await personalizationApi.save(personalizationData);
      console.log('Personalization saved to backend:', response);
      
      setPersonalizedData(fullAnswers);
      localStorage.removeItem('miniOnboardingAnswers');
      setOnboardingStage('complete');
      setCurrentPage('roadmap');
    } catch (error) {
      console.error('Error saving personalization:', error);
      alert('Failed to save personalization. Please try again.');
    }
  };

  // Handle skill click
  const handleSkillClick = (skill) => {
    console.log('App - Skill clicked:', skill);
    setSelectedSkill(skill);
  };

  const handleBackToRoadmap = () => {
    setSelectedSkill(null);
  };

  // Reset personalization (for retake quiz)
  const handleResetPersonalization = async () => {
    try {
      if (isAuthenticated) {
        await personalizationApi.delete();
      }
      setPersonalizedData(null);
      setMiniAnswers(null);
      localStorage.removeItem('miniOnboardingAnswers');
      setOnboardingStage('mini');
    } catch (error) {
      console.error('Error resetting personalization:', error);
    }
  };

  // Show onboarding screens
  if (onboardingStage === 'mini') {
    return <MiniOnboarding onComplete={handleMiniOnboardingComplete} />;
  }

  if (onboardingStage === 'preview') {
    return (
      <RoadmapPreview 
        miniAnswers={miniAnswers} 
        onSignup={handleSignupFromPreview} 
      />
    );
  }

  if (onboardingStage === 'full') {
    return (
      <FullOnboarding 
        miniAnswers={miniAnswers}
        onComplete={handleFullOnboardingComplete} 
      />
    );
  }

  // Main app
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
          onResetPersonalization={handleResetPersonalization}
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
      
      {currentPage === 'login' && (
        <Login 
          setCurrentPage={setCurrentPage}
          onLoginSuccess={() => {
            // After login, check if they need full onboarding
            const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
            if (savedMiniAnswers) {
              setOnboardingStage('full');
            }
          }}
        />
      )}
      
      {currentPage === 'signup' && (
        <Signup 
          setCurrentPage={setCurrentPage}
          onSignupSuccess={() => {
            // After signup, show full onboarding
            setOnboardingStage('full');
          }}
        />
      )}
      
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