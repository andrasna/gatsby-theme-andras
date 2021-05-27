import React, { useState, useEffect } from 'react'
import { label, icon } from '../styles/color-mode-switch.module.css'
import { BiMoon } from 'react-icons/bi'
import { BiSun } from 'react-icons/bi'

const ColorModeSwitch = () => {
  const [isDark, setDark] = useState(false)

  const switchMode = () => {
    localStorage.setItem('is-dark', !isDark)
    document.documentElement.classList.toggle('is-dark')
    setDark(!isDark)
  }

  useEffect(() => {
    if (localStorage.getItem('is-dark') === 'true') {
      setDark(true)
    }
  }, [])

  return (
    <label className={label} htmlFor="color-mode-switch">

      <input
        className="visually-hidden"
        type="checkbox"
        id="color-mode-switch"
        onChange={() => switchMode()}
        checked={isDark}
      />

      <span className="visually-hidden">Color mode switch</span>

      { isDark ? <BiSun className={icon} /> : <BiMoon className={icon} /> }

    </label>
  )
}

export { ColorModeSwitch }
