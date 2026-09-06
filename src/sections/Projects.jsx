import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { getFeaturedProjects } from '../data/projects'

export default function Projects() {
  const featured = getFeaturedProjects()

  return (
    <section id="projects" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <SectionHeading kicker="03 — Work" title="Featured projects">
        Selected work — production web applications with live demos and public
        source where available.
      </SectionHeading>

      <div className="mt-6 divide-y divide-line">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
