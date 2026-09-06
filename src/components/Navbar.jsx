import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../data/site'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ onOpenResume }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 8,
  )
  const menuId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b bg-bg/90 backdrop-blur-md',
        scrolled ? 'border-line' : 'border-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link to="/#home" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-xs font-semibold tracking-[0.16em] text-accent-fg">
            SA
          </span>
          <span className="hidden text-sm font-medium sm:inline">
            Shahid Afridi
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm text-muted transition hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden rounded-full border border-line px-3.5 py-2 text-sm font-medium hover:bg-surface md:inline-flex"
          >
            Resume
          </button>
          <Link
            to="/#contact"
            className="btn-primary hidden !px-3.5 !py-2 sm:inline-flex"
          >
            Let&apos;s Talk
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((current) => !current)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true" className="grid gap-1.5">
              <span
                className={[
                  'block h-px w-4 bg-fg transition',
                  open ? 'translate-y-[3.5px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'block h-px w-4 bg-fg transition',
                  open ? '-translate-y-[3.5px] -rotate-45' : '',
                ].join(' ')}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-line bg-bg lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto grid max-w-6xl gap-1 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="rounded-lg px-3 py-3 text-base hover:bg-surface"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/#contact"
            className="rounded-lg px-3 py-3 text-base hover:bg-surface sm:hidden"
            onClick={() => setOpen(false)}
          >
            Let&apos;s Talk
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onOpenResume()
            }}
            className="rounded-lg px-3 py-3 text-left text-base hover:bg-surface"
          >
            Resume
          </button>
        </nav>
      </div>
    </header>
  )
}
