import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading kicker="02 — Services" title="What I can build">
          Practical web development for businesses, founders and teams who need
          a site or application that actually ships.
        </SectionHeading>
        <Link
          to="/#contact"
          className="text-sm font-medium text-mark underline-offset-4 hover:underline"
        >
          Have a project in mind? Let&apos;s talk.
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 70}>
            <article className="group relative h-full overflow-hidden border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-mark/40 sm:p-8">
              <p className="font-display text-5xl text-mark/25 transition group-hover:text-mark/50">
                {service.number}
              </p>
              <h3 className="mt-6 font-display text-2xl sm:text-3xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {service.description}
              </p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-mark transition group-hover:scale-x-100" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
