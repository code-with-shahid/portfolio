import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/site'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading kicker="01 — About" title="About" />
        </div>
        <Reveal className="lg:col-span-8">
          <p className="max-w-2xl font-display text-2xl leading-snug text-fg sm:text-3xl">
            {profile.aboutPositioning}
          </p>
          <p className="mt-6 max-w-2xl text-[15px] leading-8 text-muted">
            I design and build websites and web applications that are clear,
            responsive and ready for real use. My work spans business sites,
            landing pages and full-stack products — from the interface through
            APIs and data.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-8 text-muted">
            Day to day I work with React, JavaScript, HTML, CSS and Tailwind CSS
            on the frontend, and Node.js, Express.js, APIs and databases on the
            backend. I use Git and GitHub to keep projects organized and
            shippable.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
