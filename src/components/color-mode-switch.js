import React from 'react'
import { label } from '../styles/color-mode-switch.module.css'

const ColorModeSwitch = () => {
  const switchColorMode = () => {
    if (localStorage.getItem('colorMode') === 'dark') {
      localStorage.setItem('colorMode', 'light')
      document.documentElement.classList.remove('dark-mode')
    } else {
      localStorage.setItem('colorMode', 'dark')
      document.documentElement.classList.add('dark-mode')
    }
  }

  return(
    <label
      className={label}
      htmlFor="color-mode-switch"
    >
      <input
        className="visually-hidden"
        type="checkbox"
        id="color-mode-switch"
        onClick={switchColorMode}
      />
      <span className="visually-hidden">Color mode switch</span>
    </label>
  )
}

export { ColorModeSwitch }
