import React from 'react'
import { Link } from 'gatsby'
import { logo } from '../styles/logo.module.css'

const Logo = () => {
  return(
    <Link className={logo} to="/">andras.</Link>
  )
}

export { Logo }
