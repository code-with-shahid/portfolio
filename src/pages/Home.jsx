import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Services from '../sections/Services'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'
import Achievements from '../sections/Achievements'
import FinalCta from '../sections/FinalCta'
import Contact from '../sections/Contact'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Achievements />
      <FinalCta />
      <Contact />
    </>
  )
}
