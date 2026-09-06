import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug } from '../data/projects'
import ProjectImage from '../components/ProjectImage'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!project) return <NotFound />

  return (
    <article className="py-12 sm:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-mark">
        {project.category}
      </p>
      <h1 className="mt-3 font-display text-[clamp(2rem,8vw,3.75rem)] leading-tight [overflow-wrap:anywhere]">
        {project.name}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
        {project.shortDescription}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Live Demo
        </a>
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            GitHub repository
          </a>
        ) : null}
        <Link
          to="/#projects"
          className="inline-flex px-2 py-2.5 text-sm underline-offset-4 hover:underline"
        >
          Back to projects
        </Link>
      </div>

      <div className="mt-10">
        <div className="browser-frame">
          <div className="browser-bar">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="ml-2 truncate text-[11px] text-muted">
              {project.liveUrl.replace('https://', '')}
            </span>
          </div>
          <div className="aspect-[16/10]">
            <ProjectImage
              src={project.image}
              alt={`${project.name} hero screenshot`}
              priority
            />
          </div>
        </div>
      </div>

      <section className="mt-14 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <DetailBlock title="Overview" text={project.overview} />
          <DetailBlock title="Problem" text={project.problem} />
          <DetailBlock title="Solution" text={project.solution} />
        </div>
        <aside className="lg:col-span-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            Tech stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Key features</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {project.features.map((feature) => (
            <li key={feature} className="border border-line px-4 py-4 text-sm leading-7">
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Development highlights</h2>
        <ul className="mt-5 grid gap-4">
          {project.highlights.map((item) => (
            <li key={item} className="border-l-2 border-line pl-4 text-sm leading-7 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {project.gallery?.length > 1 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl">More views</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {project.gallery.slice(1).map((shot) => (
              <div key={shot.src} className="overflow-hidden border border-line">
                <div className="aspect-[16/10]">
                  <ProjectImage src={shot.src} alt={shot.alt} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}

function DetailBlock({ title, text }) {
  return (
    <section className="mb-8">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-3 text-[15px] leading-8 text-muted">{text}</p>
    </section>
  )
}
