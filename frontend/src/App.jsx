import React, { useState, useEffect, useRef } from 'react';
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
  const [onboardingStage, setOnboardingStage] = useState(null);
  const [miniAnswers, setMiniAnswers] = useState(null);
  const [personalizedData, setPersonalizedData] = useState(null);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const hasCheckedOnboarding = useRef(false); // Use ref to track if we've checked

  // Check onboarding status ONLY on initial mount
  useEffect(() => {
    if (authLoading) return;
    if (hasCheckedOnboarding.current) return; // Only check once

    const checkOnboardingStatus = async () => {
      console.log('🔍 Checking onboarding status...');
      
      if (isAuthenticated && user) {
        console.log('User authenticated, checking personalization...');
        try {
          const response = await personalizationApi.get();
          console.log('Personalization from backend:', response);
          
          if (response.personalization && response.personalization.generatedRoadmap) {
            setPersonalizedData(response.personalization.generatedRoadmap);
            setOnboardingStage('complete');
            console.log('✅ User has completed personalization');
          } else {
            const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
            if (savedMiniAnswers) {
              setMiniAnswers(JSON.parse(savedMiniAnswers));
              setOnboardingStage('full');
              console.log('📝 User needs to complete full onboarding');
            } else {
              setOnboardingStage('mini');
              console.log('🆕 User needs to start mini onboarding');
            }
          }
        } catch (error) {
          console.error('Error loading personalization:', error);
          const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
          if (savedMiniAnswers) {
            setMiniAnswers(JSON.parse(savedMiniAnswers));
            setOnboardingStage('full');
          } else {
            setOnboardingStage('mini');
          }
        }
      } else {
        console.log('User not authenticated');
        const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
        if (savedMiniAnswers) {
          setMiniAnswers(JSON.parse(savedMiniAnswers));
          setOnboardingStage('preview');
          console.log('👀 Showing preview to unauthenticated user');
        } else {
          setOnboardingStage('mini');
          console.log('🆕 New visitor - showing mini onboarding');
        }
      }
      
      setIsCheckingOnboarding(false);
      hasCheckedOnboarding.current = true;
    };

    checkOnboardingStatus();
  }, [isAuthenticated, user, authLoading]);

  // Handle mini onboarding complete
  const handleMiniOnboardingComplete = (answers) => {
    console.log('Mini onboarding complete:', answers);
    setMiniAnswers(answers);
    localStorage.setItem('miniOnboardingAnswers', JSON.stringify(answers));
    setOnboardingStage('preview');
  };

  // Handle signup from preview
  const handleSignupFromPreview = () => {
    console.log('Navigating to signup from preview');
    setCurrentPage('signup');
  };

  // Handle login from preview
  const handleLoginFromPreview = () => {
    console.log('Navigating to login from preview');
    setCurrentPage('login');
  };

  // Handle full onboarding complete
  const handleFullOnboardingComplete = async (fullAnswers) => {
    console.log('Full onboarding complete:', fullAnswers);
    
    try {
      const response = await personalizationApi.save({ answers: fullAnswers });
      console.log('Personalization saved to backend:', response);
      
      if (response.personalization && response.personalization.generatedRoadmap) {
        setPersonalizedData(response.personalization.generatedRoadmap);
      }
      
      localStorage.removeItem('miniOnboardingAnswers');
      setOnboardingStage('complete');
      setCurrentPage('roadmap');
    } catch (error) {
      console.error('Error saving personalization:', error);
      alert('Failed to save personalization. Please try again.');
    }
  };

  // Handle successful login
  const handleLoginSuccess = async () => {
    console.log('✅ Login successful!');
    const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
    
    if (savedMiniAnswers) {
      console.log('User has mini answers, showing full onboarding');
      setMiniAnswers(JSON.parse(savedMiniAnswers));
      setOnboardingStage('full');
      setCurrentPage('home');
    } else {
      console.log('Checking backend for personalization');
      try {
        const response = await personalizationApi.get();
        if (response.personalization?.generatedRoadmap) {
          setPersonalizedData(response.personalization.generatedRoadmap);
          setOnboardingStage('complete');
          setCurrentPage('roadmap');
          console.log('✅ User has personalization - going to roadmap');
        } else {
          setOnboardingStage('mini');
          setCurrentPage('home');
          console.log('No personalization - showing mini onboarding');
        }
      } catch (error) {
        setOnboardingStage('mini');
        setCurrentPage('home');
        console.log('No personalization found - showing mini onboarding');
      }
    }
  };

  // Handle successful signup
  const handleSignupSuccess = () => {
    console.log('✅ Signup successful!');
    const savedMiniAnswers = localStorage.getItem('miniOnboardingAnswers');
    
    if (savedMiniAnswers) {
      console.log('User has mini answers, showing full onboarding');
      setMiniAnswers(JSON.parse(savedMiniAnswers));
      setOnboardingStage('full');
      setCurrentPage('home');
    } else {
      console.log('No mini answers, showing mini onboarding');
      setOnboardingStage('mini');
      setCurrentPage('home');
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

  // Reset personalization
  const handleResetPersonalization = async () => {
    try {
      if (isAuthenticated) {
        await personalizationApi.delete();
      }
      setPersonalizedData(null);
      setMiniAnswers(null);
      localStorage.removeItem('miniOnboardingAnswers');
      setOnboardingStage('mini');
      hasCheckedOnboarding.current = false; // Allow re-check
    } catch (error) {
      console.error('Error resetting personalization:', error);
    }
  };

  // Show loading while checking auth or onboarding
  if (authLoading || isCheckingOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only show onboarding if NOT on login/signup pages AND onboarding is incomplete
  const shouldShowOnboarding = currentPage !== 'login' && 
                               currentPage !== 'signup' && 
                               onboardingStage !== 'complete';

  if (shouldShowOnboarding) {
    if (onboardingStage === 'mini') {
      return <MiniOnboarding onComplete={handleMiniOnboardingComplete} />;
    }

    if (onboardingStage === 'preview') {
      return (
        <RoadmapPreview 
          miniAnswers={miniAnswers} 
          onSignup={handleSignupFromPreview}
          onLogin={handleLoginFromPreview}
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
  }

  const handleNavigation = (page) => {
    if (page === 'roadmap') {
      setSelectedSkill(null); // Always reset skill when navigating to roadmap
    }
    setCurrentPage(page);
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  // Main app
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={handleNavigation}
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
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {currentPage === 'signup' && (
        <Signup 
          setCurrentPage={setCurrentPage}
          onSignupSuccess={handleSignupSuccess}
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