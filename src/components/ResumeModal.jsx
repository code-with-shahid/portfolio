import { useEffect } from 'react'
import { profile } from '../data/site'

export default function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/70 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <div className="flex items-center justify-between gap-3 border border-line bg-surface px-4 py-3">
          <div className="min-w-0">
            <p id="resume-title" className="truncate text-sm font-medium">
              Resume preview
            </p>
            <p className="text-xs text-muted">Press Escape to close</p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-line px-3 py-2 text-xs font-medium hover:bg-bg"
            >
              Open in new tab
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="inline-flex items-center rounded-full bg-accent px-3 py-2 text-xs font-medium text-accent-fg"
            >
              Download
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center rounded-full border border-line px-3 py-2 text-xs font-medium hover:bg-bg"
            >
              Close
            </button>
          </div>
        </div>
        <iframe
          title="Resume PDF preview"
          src={profile.resumeUrl}
          className="mt-3 h-full w-full border border-line bg-surface"
        />
      </div>
    </div>
  )
}
