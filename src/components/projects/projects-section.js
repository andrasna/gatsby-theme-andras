import React from 'react'
import { Projects } from './projects'
import { bg, title } from '../../styles/projects/projects-section.module.css'

const ProjectsSection = () => (
  <section className={bg}>
      <h2 className={title}>
        My stuff on GitHub
      </h2>

      <Projects />
  </section>
)

export { ProjectsSection }
