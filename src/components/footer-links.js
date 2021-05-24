import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FaCodepen } from 'react-icons/fa'
import { FaStackOverflow } from 'react-icons/fa'
import { list, item, icon } from '../styles/footer-links.module.css'

const FooterLinks = () => {
  return(
    <ul className={list}>
      <li className={item}>
        <a title="Link to Github." href="https://github.com/andrasna">
          <FaGithub className={icon} alt="GitHub Icon" />
        </a>
      </li>
      <li className={item}>
        <a title="Link to CodePen." href="https://codepen.io/andrasnagy">
          <FaCodepen  className={icon} alt="CodePen Icon" />
        </a>
      </li>
      <li className={item}>
        <a title="Link to StackOverflow." href="https://stackoverflow.com/users/5591717/fee-fi-fo-fum">
          <FaStackOverflow  className={icon} alt="StackOverflow Icon" />
        </a>
      </li>
    </ul>
  )
}

export { FooterLinks }