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
import { personalizationApi } from './utils/personalizationApi';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Onboarding state
  const [onboardingStage, setOnboardingStage] = useState(null); // null, 'mini', 'preview', 'full', 'complete'
  const [miniAnswers, setMiniAnswers] = useState(null);
  const [personalizedData, setPersonalizedData] = useState(null);
  
  const { isAuthenticated, user, loading: authLoading } = useAuth();

  // Check onboarding status on mount and when auth changes
  useEffect(() => {
    if (authLoading) return;

    const checkOnboardingStatus = async () => {
      if (onboardingStage) return; // Already in onboarding, don’t overwrite

      if (isAuthenticated && user) {
        console.log('User authenticated, checking personalization...');
        try {
          const response = await personalizationApi.get();
          console.log('Personalization from backend:', response);

          if (response.personalization && response.personalization.generatedRoadmap) {
            setPersonalizedData(response.personalization.generatedRoadmap);
            setOnboardingStage('complete'); // Show roadmap
            console.log('Loaded personalization from backend');
          } else {
            // Logged in but no personalization
            const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
            if (savedMiniAnswers) {
              setMiniAnswers(JSON.parse(savedMiniAnswers));
              setOnboardingStage('full'); // Show full onboarding
              console.log('User has mini answers, showing full onboarding');
            } else {
              setOnboardingStage('mini'); // Start fresh
              console.log('No personalization, starting mini onboarding');
            }
          }
        } catch (error) {
          console.error('Error loading personalization:', error);
          setOnboardingStage('mini');
        }
      } else {
        // Not logged in
        const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
        if (savedMiniAnswers) {
          setMiniAnswers(JSON.parse(savedMiniAnswers));
          setOnboardingStage('mini'); // Force mini onboarding for anon users
          console.log('User has mini answers but not logged in, showing mini onboarding');
        } else {
          setOnboardingStage('mini'); // Brand new user
          console.log('New anon user, showing mini onboarding');
        }
      }
    };

    checkOnboardingStatus();
  }, [authLoading, isAuthenticated, user, onboardingStage]);


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
    // setOnboardingStage(null); // Temporarily hide onboarding to show signup
  };

  // Handle full onboarding complete (after signup)
  const handleFullOnboardingComplete = async (fullAnswers) => {
    console.log('Full onboarding complete:', fullAnswers);
    
    try {
      // Send answers to backend - backend will generate the roadmap
      const response = await personalizationApi.save({ answers: fullAnswers });
      console.log('Personalization saved to backend:', response);
      
      // Use the generated roadmap from backend
      if (response.personalization && response.personalization.generatedRoadmap) {
        setPersonalizedData(response.personalization.generatedRoadmap);
      }
      
      localStorage.removeItem('miniOnboardingAnswers'); // Clean up
      setOnboardingStage('complete');
      setCurrentPage('roadmap'); // Go to roadmap
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

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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

  // Main app (onboarding complete or on specific pages)
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
              setMiniAnswers(JSON.parse(savedMiniAnswers));
              setOnboardingStage('full');
            } else {
              // They logged in without mini onboarding - check backend
              setOnboardingStage(null); // Will trigger useEffect to check backend
            }
          }}
        />
      )}
      
      {currentPage === 'signup' && (
        <Signup 
          setCurrentPage={setCurrentPage}
          onSignupSuccess={() => {
            // After signup, show full onboarding if they have mini answers
            const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
            if (savedMiniAnswers) {
              setMiniAnswers(JSON.parse(savedMiniAnswers));
              setOnboardingStage('full');
            } else {
              // Signed up without mini onboarding - start from mini
              setOnboardingStage('mini');
            }
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