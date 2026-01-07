import { useState } from 'react'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import RoadmapPage from './pages/RoadmapPage'
import Profile from './pages/Profile'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {currentPage === 'home' && <Home />}
      {currentPage === 'roadmap' && <RoadmapPage />}
      {currentPage === 'profile' && <Profile />}
    </>
  )
}