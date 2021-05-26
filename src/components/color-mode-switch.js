import React, { useState } from 'react'
import { button, icon } from '../styles/color-mode-switch.module.css'
import { BiMoon } from 'react-icons/bi'
import { BiSun } from 'react-icons/bi'

const ColorModeSwitch = () => {
  const [isDark, setDark] = useState(true)

  // useEffect(() => {
  //   localStorage.setItem('is-dark', isDark)
  //   document.documentElement.classList.toggle(!!isDark ? 'is-dark' : '')
  // }, [isDark])

  // const isDark = false;

  return(
    <button className={button} onClick={() => setDark(!isDark)}>
      { isDark ?  <BiMoon className={icon} /> : <BiSun className={icon} /> } 
    </button>
  )
}

export { ColorModeSwitch }