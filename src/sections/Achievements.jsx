import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { achievements } from '../data/achievements'

export default function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <SectionHeading
        kicker="05 — Beyond the work"
        title="Selected work beyond projects"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {achievements.map((item, index) => (
          <Reveal key={item.title} delay={index * 50}>
            <article className="h-full border border-line bg-surface p-6 transition hover:border-mark/40 sm:p-8">
              <p className="font-display text-2xl text-mark/80">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{item.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
