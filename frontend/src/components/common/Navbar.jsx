import React from 'react';
import { Home, Map, User, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setCurrentPage('home');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              HipHop Roadmap
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'home' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('roadmap')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'roadmap' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Map size={20} />
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'profile' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Hi, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-shadow"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <button
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'home' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => { setCurrentPage('roadmap'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'roadmap' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'
              }`}
            >
              <Map size={20} />
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => { setCurrentPage('profile'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'profile' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </button>

            <div className="mt-4 pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-600">Hi, {user?.username}</div>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-700"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;