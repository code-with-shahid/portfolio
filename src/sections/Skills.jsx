import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { skillGroups } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <SectionHeading kicker="04 — Skills" title="Technical skills">
        Technologies I use to design, build and ship websites and applications.
      </SectionHeading>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 60}>
            <div className="h-full border border-line bg-surface p-5 sm:p-6">
              <h3 className="text-sm font-semibold tracking-[0.14em] uppercase text-mark">
                {group.title}
              </h3>
              <ul className="mt-4 grid gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line py-2 text-sm last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
