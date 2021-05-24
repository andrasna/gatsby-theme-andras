import React from 'react'
import { Projects } from './projects'
import { title } from '../../styles/projects/projects-section.module.css'

const ProjectsSection = () => (
  <section>
      <h2 className={title}>
        My stuff on GitHub
      </h2>

      <Projects />
  </section>
)

export { ProjectsSection }
