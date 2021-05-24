import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { ProjectFooter } from './project-footer'
import { list, item, title, link, desc } from '../../styles/projects/projects.module.css'
import { card } from '../../styles/card.module.css'

const Project = ({repo}) => (
  <li className={`${card} ${item}`}>
    <h3 className={title}>
      <a className={link} href={repo.url}>
        {repo.name}
      </a>
    </h3>

    <p className={desc}>{repo.description}</p>

    <ProjectFooter repo={repo} />
  </li>
)

const Projects = () => {
  const data = useStaticQuery(graphql`
  {
    github {
      user(login: "andrasna") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on GitHub_Repository {
              id
              name
              stargazerCount
              forkCount
              url
              description
              primaryLanguage {
                name
              }
            }
          }
        }
      }
    }
  }`)

  const pinnedRepos = data.github.user.pinnedItems.nodes

  return (
    <ul className={list}>
      {pinnedRepos.map(repo => <Project key={repo.id} repo={repo}/>)}
    </ul>
  )
}

export { Projects }
