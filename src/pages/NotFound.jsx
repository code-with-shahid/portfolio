import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="py-24">
      <h1 className="font-display text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted">
        That page does not exist. Head back to the homepage to see selected work.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Back home
      </Link>
    </section>
  )
}
