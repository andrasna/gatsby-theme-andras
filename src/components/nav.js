import React from 'react'
import { Link } from 'gatsby'
import { nav, list, item, link as linkStyle, linkIsCurrent } from '../styles/nav/nav.module.css'

const NavItem = ({ link, name }) => (
  <li className={item}>
    <Link
      className={linkStyle}
      activeClassName={linkIsCurrent}
      to={link}
    >
      {name} 
    </Link>
  </li>
)

const NavList = () => (
  <ul className={list} id='menu'>
    <NavItem link='/' name='Home'/>
    <NavItem link='/about' name='About'/>
    <NavItem link='/blog' name='Blog'/>
  </ul>
)

const Nav = () => (
  <nav className={nav} role='navigation' aria-label='navigation'>
    <NavList />
  </nav>
)

export { Nav }
