import { Link } from 'react-router-dom'
import profileImg from '../assets/profile.png'
import { heroTech, profile } from '../data/site'

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-24 py-16 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mark" />
            Available for new projects
          </p>
          <p className="section-kicker mt-6">{profile.role}</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,11vw,5.4rem)] leading-[0.95] [overflow-wrap:anywhere]">
            Shahid
            <span className="block italic text-mark">Afridi</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted [overflow-wrap:anywhere] sm:text-lg">
            {profile.heroMessage}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {heroTech.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/#projects" className="btn-primary w-full sm:w-auto">
              View My Work
            </Link>
            <Link to="/#contact" className="btn-secondary w-full sm:w-auto">
              Let&apos;s Work Together
            </Link>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-2 py-3 text-sm font-medium underline-offset-4 hover:underline sm:justify-start"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <div className="portrait-frame mx-auto w-full max-w-sm lg:ml-auto lg:mr-0">
            <img
              src={profileImg}
              alt="Portrait of Shahid Afridi"
              width={512}
              height={640}
              className="aspect-[4/5] h-auto w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 border border-white/10 bg-black/55 px-4 py-3 text-sm text-white backdrop-blur-sm">
              Web Developer · React & Full-Stack
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
