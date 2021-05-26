import React, { useState } from 'react'
import { label, icon } from '../styles/color-mode-switch.module.css'
import { BiMoon } from 'react-icons/bi'
import { BiSun } from 'react-icons/bi'

const ColorModeSwitch = () => {
  const [isDark, setDark] = useState(true)

  // useEffect(() => {
  //   localStorage.setItem('is-dark', isDark)
  //   document.documentElement.classList.toggle(!!isDark ? 'is-dark' : '')
  // }, [isDark])

  // const isDark = false;

  return (
    <label className={label} htmlFor="color-mode-switch">
      <input
        className="visually-hidden"
        type="checkbox"
        id="color-mode-switch"
        onChange={() => setDark(!isDark)}
        checked={isDark}
      />
      <span className="visually-hidden">Color mode switch</span>
      { isDark ?  <BiMoon className={icon} /> : <BiSun className={icon} /> } 
    </label>
  )
}

export { ColorModeSwitch }