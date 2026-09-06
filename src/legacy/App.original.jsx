import { useEffect, useMemo, useRef, useState } from 'react'
import profileImg from './assets/profile.png'

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={[
        'transition-all duration-700 will-change-transform',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function App() {
  const profile = {
    githubUrl: 'https://github.com/code-with-shahid',
    linkedinUrl: 'https://www.linkedin.com/in/shahid-afridi-tech',
    phone: '+91 8100479536',
    email: 'mdafridishahid8910@gmail.com',
  }

  const resumeUrl = '/Shahid_Afridi_Final_CV.pdf'
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const openResume = () => setIsResumeOpen(true)
  const closeResume = () => setIsResumeOpen(false)

  const nav = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const skills = ['MERN', 'React', 'Node', 'MongoDB', 'AI APIs']

  const sections = useMemo(
    () => ['home', 'about', 'skills', 'projects', 'contact'],
    [],
  )
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    if (prefersReducedMotion) return

    const els = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0]
        if (visible?.target?.id) setActiveSection(visible.target.id)
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: '-20% 0px -65% 0px',
      },
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [sections])

  const typingPhrases = useMemo(
    () => ['Full Stack Developer', 'AI Enthusiast'],
    [],
  )
  const [typedText, setTypedText] = useState('')
  const [typingIndex, setTypingIndex] = useState(0)
  const [typingPhase, setTypingPhase] = useState('typing') // typing | holding | deleting

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    if (prefersReducedMotion) {
      setTypedText(typingPhrases.join(' • '))
      return
    }

    const phrase = typingPhrases[typingIndex % typingPhrases.length]
    const speedTyping = 40
    const speedDeleting = 22
    const holdMs = 900

    const t = window.setTimeout(
      () => {
        if (typingPhase === 'typing') {
          const next = phrase.slice(0, typedText.length + 1)
          setTypedText(next)
          if (next.length === phrase.length) setTypingPhase('holding')
          return
        }

        if (typingPhase === 'holding') {
          setTypingPhase('deleting')
          return
        }

        // deleting
        const next = typedText.slice(0, -1)
        setTypedText(next)
        if (next.length === 0) {
          setTypingIndex((i) => (i + 1) % typingPhrases.length)
          setTypingPhase('typing')
        }
      },
      typingPhase === 'holding'
        ? holdMs
        : typingPhase === 'typing'
          ? speedTyping
          : speedDeleting,
    )

    return () => window.clearTimeout(t)
  }, [typedText, typingIndex, typingPhase, typingPhrases])

  useEffect(() => {
    if (!isResumeOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeResume()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isResumeOpen])

  const projects = [
    {
      title: 'InterviewIQ',
      description:
        'An AI-powered interview preparation platform that helps users practice technical interviews with real-time feedback and questions generated using AI.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Generative AI APIs'],
      githubUrl: 'https://github.com/code-with-shahid/InterviewIQ',
      liveUrl: 'https://interviewiq-client-yczp.onrender.com',
    },
    {
      title: 'ExamNotesAI',
      description:
        'A smart AI-based notes generator that creates high-quality exam notes from topics or questions using generative AI, helping students study faster and more effectively.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'AI APIs'],
      githubUrl: 'https://github.com/code-with-shahid/ExamNotesAI',
      liveUrl: 'https://examnotesaiclient-90vb.onrender.com',
    },
  ]

  return (
    <div className="min-h-dvh">
      {isResumeOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeResume()
          }}
        >
          <div className="mx-auto flex h-full max-w-5xl flex-col px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-xl">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  Resume Preview
                </p>
                <p className="truncate text-xs text-slate-400">
                  Press Esc to close
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Open in new tab
                </a>
                <a
                  href={resumeUrl}
                  download
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                >
                  <span className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(120px_120px_at_20%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <span className="relative">Download</span>
                </a>
                <button
                  type="button"
                  onClick={closeResume}
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-xl">
              <iframe
                title="Resume PDF preview"
                src={resumeUrl}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute -bottom-48 left-[-8rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-48 right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_50%_-20%,rgba(99,102,241,0.20),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a
            href="#home"
            className="group inline-flex items-center gap-2 font-semibold tracking-tight text-white"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-white/10 transition group-hover:ring-white/20">
              SA
            </span>
            <span className="hidden sm:inline">Shahid Afridi</span>
          </a>

          <div className="hidden items-center gap-6 sm:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={[
                  'text-sm font-medium transition-colors',
                  activeSection === item.href.slice(1)
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white',
                ].join(' ')}
              >
                <span className="relative">
                  {item.label}
                  <span
                    className={[
                      'absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-indigo-400/80 to-fuchsia-400/80 transition-opacity',
                      activeSection === item.href.slice(1)
                        ? 'opacity-100'
                        : 'opacity-0',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                </span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openResume}
              className="hidden items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 sm:inline-flex"
            >
              Download CV
            </button>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-3.5 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Let&apos;s talk
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main id="home" className="mx-auto max-w-6xl px-4 sm:px-6 scroll-mt-24">
        <section className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="text-center lg:col-span-7 lg:text-left">
              <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 lg:mx-0">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Available for opportunities
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                <span className="bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
                  Shahid Afridi
                </span>
              </h1>
              <p className="mt-4 text-lg font-medium text-slate-200 sm:text-xl">
                <span className="bg-gradient-to-r from-indigo-200 via-white to-fuchsia-200 bg-clip-text text-transparent">
                  {typedText}
                </span>
                <span className="ml-1 inline-block h-5 w-[1px] bg-white/70 align-[-0.15em] animate-caret" />
              </p>
              <p className="mx-auto mt-6 max-w-xl text-slate-400 lg:mx-0">
                I build fast, modern web apps with clean UX—shipping end-to-end
                features across the MERN stack and integrating AI APIs when it adds real
                value.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start">
                <a
                  href="#projects"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                >
                  <span className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(120px_120px_at_20%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <span className="relative">View Projects</span>
                  <span className="relative ml-2 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
                <button
                  type="button"
                  onClick={openResume}
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Download Resume
                </button>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5">
              <div className="flex flex-col items-center gap-8 lg:items-end lg:gap-10">
                <div className="group relative self-center lg:self-end">
                  {/* animated aurora glow */}
                  <div className="animate-aurora absolute -inset-10 -z-10 rounded-full bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/15 to-cyan-500/15 blur-3xl transition group-hover:from-indigo-500/25 group-hover:via-fuchsia-500/20 group-hover:to-cyan-500/20" />
                  {/* subtle outer ring */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-400/60 via-fuchsia-400/55 to-cyan-300/50 opacity-60 blur-[1px] transition group-hover:opacity-80" />

                  <div className="relative rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300 p-[2px] shadow-2xl">
                    <div className="rounded-full bg-slate-950 p-[2px] ring-1 ring-white/10">
                      <img
                        src={profileImg}
                        alt="Shahid Afridi profile"
                        className="h-56 w-56 rounded-full object-cover shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition duration-300 group-hover:scale-[1.03] sm:h-64 sm:w-64"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-md">
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:border-white/20 hover:bg-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(600px_240px_at_30%_10%,rgba(99,102,241,0.28),transparent_55%)]" />
                    <div className="relative">
                      <div className="grid gap-3">
                        <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10 transition hover:ring-white/20">
                          <p className="text-sm font-semibold text-white">Focus</p>
                          <p className="mt-1 text-sm text-slate-300">
                            Building production-ready apps + AI features
                          </p>
                        </div>
                        <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10 transition hover:ring-white/20">
                          <p className="text-sm font-semibold text-white">Stack</p>
                          <p className="mt-1 text-sm text-slate-300">
                            React, Node, MongoDB, APIs
                          </p>
                        </div>
                        <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10 transition hover:ring-white/20">
                          <p className="text-sm font-semibold text-white">Style</p>
                          <p className="mt-1 text-sm text-slate-300">
                            Clean UI, responsive layouts, performance-first
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs font-medium text-slate-300">
                          Quick links
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href="#contact"
                            className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/15 hover:text-white"
                          >
                            Contact
                          </a>
                          <a
                            href="#projects"
                            className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/15 hover:text-white"
                          >
                            Projects
                          </a>
                          <a
                            href="#about"
                            className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/15 hover:text-white"
                          >
                            About
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                About Me
              </h2>
              <div className="mt-4 h-px w-16 bg-gradient-to-r from-indigo-500/80 to-fuchsia-500/50" />
              <p className="mt-2 text-slate-400">
                A short intro and what I enjoy building.
              </p>
            </div>
            <div className="lg:col-span-8">
              <Reveal className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:border-white/20 hover:bg-white/10 sm:p-8">
                <div className="max-w-prose">
                  <p className="text-base leading-relaxed text-slate-300 sm:text-[15px] sm:leading-7">
                    I&apos;m a Computer Science student passionate about building real-world
                    web applications that solve meaningful problems. I specialize in the
                    MERN stack and have hands-on experience integrating AI into products,
                    including platforms like{' '}
                    <span className="font-semibold text-white">InterviewIQ</span> and{' '}
                    <span className="font-semibold text-white">ExamNotesAI</span>. I enjoy
                    turning ideas into scalable, user-friendly solutions and
                    continuously improving my skills through practical projects and
                    problem solving.
                  </p>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-900/50 p-4 ring-1 ring-white/10 transition hover:ring-white/20">
                    <p className="text-sm font-semibold text-white">What I build</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Dashboards, SaaS-style apps, APIs, and tooling
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/50 p-4 ring-1 ring-white/10 transition hover:ring-white/20">
                    <p className="text-sm font-semibold text-white">What I value</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Clarity, performance, accessibility, and DX
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24 py-14 sm:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Skills
              </h2>
              <div className="mt-4 h-px w-16 bg-gradient-to-r from-indigo-500/80 to-fuchsia-500/50" />
              <p className="mt-2 text-slate-400">Technologies I use regularly.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {skills.map((skill) => (
              <Reveal
                key={skill}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{skill}</p>
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 opacity-70 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Production-focused experience
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-24 py-14 sm:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Projects
              </h2>
              <div className="mt-4 h-px w-16 bg-gradient-to-r from-indigo-500/80 to-fuchsia-500/50" />
              <p className="mt-2 text-slate-400">
                A few things I&apos;ve built recently.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Request a demo
            </a>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {projects.map((p) => (
              <Reveal
                key={p.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-[radial-gradient(520px_260px_at_20%_0%,rgba(99,102,241,0.22),transparent_60%)] opacity-70 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                    <span className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-[11px] font-semibold text-slate-200">
                      Featured
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {p.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-xs font-semibold text-slate-200 transition group-hover:border-white/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      GitHub
                    </a>
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn relative inline-flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                    >
                      <span className="absolute inset-0 opacity-0 transition-opacity group-hover/btn:opacity-100 bg-[radial-gradient(120px_120px_at_20%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                      <span className="relative">Live Demo</span>
                      <span className="relative ml-2 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 py-14 sm:py-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:border-white/20 hover:bg-white/10 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Contact
                </h2>
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-indigo-500/80 to-fuchsia-500/50" />
                <p className="mt-2 text-slate-400">
                  Want to collaborate or hire me? Send a message.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/40 px-4 py-3 ring-1 ring-white/10 transition hover:ring-white/20"
                  >
                    <span className="font-semibold text-white">Email</span>
                    <span className="text-slate-300">{profile.email}</span>
                  </a>
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/40 px-4 py-3 ring-1 ring-white/10 transition hover:ring-white/20"
                  >
                    <span className="font-semibold text-white">Phone</span>
                    <span className="text-slate-300">{profile.phone}</span>
                  </a>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/40 px-4 py-3 ring-1 ring-white/10 transition hover:ring-white/20"
                  >
                    <span className="font-semibold text-white">GitHub</span>
                    <span className="text-slate-300">code-with-shahid</span>
                  </a>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/40 px-4 py-3 ring-1 ring-white/10 transition hover:ring-white/20"
                  >
                    <span className="font-semibold text-white">LinkedIn</span>
                    <span className="text-slate-300">shahid-afridi-tech</span>
                  </a>
                </div>
              </div>

              <Reveal className="lg:col-span-7">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-sm font-semibold text-white">Name</span>
                      <input
                        className="h-11 rounded-xl border border-white/10 bg-slate-900/40 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                        placeholder="Your name"
                        name="name"
                        autoComplete="name"
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm font-semibold text-white">Email</span>
                      <input
                        className="h-11 rounded-xl border border-white/10 bg-slate-900/40 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                        placeholder="you@example.com"
                        name="email"
                        autoComplete="email"
                        type="email"
                      />
                    </label>
                    <label className="grid gap-2 sm:col-span-2">
                      <span className="text-sm font-semibold text-white">
                        Message
                      </span>
                      <textarea
                        className="min-h-28 resize-y rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                        placeholder="Tell me about your project…"
                        name="message"
                      />
                    </label>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-400">
                      This form is UI-only (no backend wired yet).
                    </p>
                    <button
                      type="submit"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                    >
                      <span className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(120px_120px_at_20%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                      <span className="relative">Send Message</span>
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Shahid Afridi. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-medium text-slate-300 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <span aria-hidden="true" className="text-white/20">
                •
              </span>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-300 transition-colors hover:text-white"
              >
                GitHub
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-300 transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
