import React, { useState } from 'react'
import { Home, Map, User, Menu, X } from 'lucide-react'
import NavButton from './NavButton'

export default function Navbar({ currentPage, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { key: 'home', label: 'Home', icon: <Home size={20} /> },
    { key: 'roadmap', label: 'Roadmap', icon: <Map size={20} /> },
    { key: 'profile', label: 'Profile', icon: <User size={20} /> },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            HipHop Roadmap
          </h1>

          {/* Desktop */}
          <div className="hidden md:flex gap-6">
            {navItems.map(item => (
              <NavButton
                key={item.key}
                active={currentPage === item.key}
                icon={item.icon}
                label={item.label}
                onClick={() => setCurrentPage(item.key)}
              />
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 space-y-1">
            {navItems.map(item => (
              <NavButton
                key={item.key}
                full
                active={currentPage === item.key}
                icon={item.icon}
                label={item.label}
                onClick={() => {
                  setCurrentPage(item.key)
                  setMobileMenuOpen(false)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}