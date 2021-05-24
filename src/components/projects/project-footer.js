import React from 'react'
import { FaRegStar } from 'react-icons/fa'
import { FaCircle } from 'react-icons/fa'
import { GoRepoForked } from 'react-icons/go'
import { list, item, star, circle } from '../../styles/projects/project-footer.module.css'

const ProjectFooter = ({repo}) => (
  <ul className={list}>
    <li key='circle' className={item}>
      <FaCircle className={`${circle} color-${repo.primaryLanguage.name}`} />
      {repo.primaryLanguage.name}
    </li>

    { repo.stargazerCount > 0 &&

    <li key='star' className={item}>
      <FaRegStar className={star} />
      {repo.stargazerCount}
    </li>

    }
    { repo.forkCount > 0 &&

    <li key='fork' className={item}>
      <GoRepoForked />
      {repo.forkCount}
    </li>
    }
  </ul>
)

export { ProjectFooter }
