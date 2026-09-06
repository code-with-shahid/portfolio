import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import SectionHeading from '../components/SectionHeading'
import { FIVERR_URL, profile } from '../data/site'

export default function Contact() {
  const links = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'GitHub', value: profile.githubHandle, href: profile.githubUrl },
    { label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedinUrl },
    FIVERR_URL
      ? { label: 'Fiverr', value: 'Hire on Fiverr', href: FIVERR_URL }
      : null,
  ].filter(Boolean)

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading kicker="06 — Contact" title="Let’s talk" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            Tell me what you want to build. I typically reply with next steps,
            scope questions and a realistic timeline.
          </p>
          <ul className="mt-8 grid gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex items-center justify-between gap-4 border border-line bg-surface px-4 py-3 text-sm transition hover:border-mark/40"
                >
                  <span className="font-medium">{link.label}</span>
                  <span className="truncate text-muted">{link.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="lg:col-span-7">
          <div className="border border-line bg-surface p-5 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
