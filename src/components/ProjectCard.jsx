import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import ProjectImage from './ProjectImage'
import BrowserFrame from './BrowserFrame'

export default function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1
  const number = String(index + 1).padStart(2, '0')

  return (
    <Reveal>
      <article className="group py-10 sm:py-16">
        <div
          className={[
            'grid items-center gap-8 lg:grid-cols-12 lg:gap-12',
            reversed ? 'lg:[&>div:first-child]:order-2' : '',
          ].join(' ')}
        >
          <div className="lg:col-span-7">
            <Link
              to={`/projects/${project.slug}`}
              className="block transition duration-500 group-hover:-translate-y-1"
            >
              <BrowserFrame label={project.liveUrl.replace('https://', '')}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ProjectImage
                    src={project.image}
                    alt={`${project.name} preview`}
                    className="transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              </BrowserFrame>
            </Link>
          </div>

          <div className="lg:col-span-5">
            <p className="font-display text-4xl text-mark/70">{number}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-mark">
              {project.category}
            </p>
            <h3 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
              <Link to={`/projects/${project.slug}`} className="hover:text-mark">
                {project.name}
              </Link>
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-[15px]">
              {project.shortDescription}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                View Live
              </a>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  View Code
                </a>
              ) : null}
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center px-1 py-2.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                Case study
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
