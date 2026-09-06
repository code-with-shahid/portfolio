import { Link } from 'react-router-dom'
import { FIVERR_URL, navItems, profile } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="text-muted hover:text-fg">
              {item.label}
            </Link>
          ))}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-fg"
          >
            GitHub
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-fg"
          >
            LinkedIn
          </a>
          {FIVERR_URL ? (
            <a
              href={FIVERR_URL}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-fg"
            >
              Fiverr
            </a>
          ) : null}
        </nav>
      </div>
    </footer>
  )
}
