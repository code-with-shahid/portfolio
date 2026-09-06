import { Link } from 'react-router-dom'

export default function FinalCta() {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <div className="relative overflow-hidden border border-line bg-surface px-6 py-14 sm:px-12 sm:py-20">
        <p className="pointer-events-none absolute -right-4 -top-8 font-display text-[8rem] leading-none text-mark/10 sm:text-[12rem]">
          Build
        </p>
        <p className="section-kicker relative">Next step</p>
        <h2 className="relative mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-6xl">
          Have a website idea?{' '}
          <span className="italic text-mark">Let&apos;s build it.</span>
        </h2>
        <p className="relative mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
          Whether you need a business website, landing page, React application or
          full-stack web solution, I&apos;m available to discuss your project.
        </p>
        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/#contact" className="btn-primary">
            Start a Project
          </Link>
          <Link to="/#projects" className="btn-secondary">
            View My Work
          </Link>
        </div>
      </div>
    </section>
  )
}
