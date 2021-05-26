import React from 'react'
import { ColorModeSwitch } from '../components/color-mode-switch'
import { Nav } from '../components/nav'
import { Logo } from '../components/logo'
import { navArea } from '../styles/nav/nav-area.module.css'

const NavArea = () => {
  return(
    <section className={navArea}>
      <Logo />


      <Nav />

      <ColorModeSwitch />
    </section>
  )
}

export { NavArea }
