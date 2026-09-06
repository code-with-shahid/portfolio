import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ResumeModal from './components/ResumeModal'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="page-atmosphere" aria-hidden="true" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      <main id="main" className="mx-auto min-w-0 max-w-6xl px-4 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ResumeModal open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  )
}
