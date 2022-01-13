import React, { useState, useEffect, useRef } from 'react'
import { label, icon } from '../styles/color-mode-switch.module.css'
import { BiMoon } from 'react-icons/bi'
import { BiSun } from 'react-icons/bi'

const ColorModeSwitch = () => {
  const [isDark, setDark] = useState(false)

  const isMounting = useRef(true)

  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false

      if (localStorage.getItem('is-dark') === 'true') {
        setDark(true)
      }
    } else {
      localStorage.setItem('is-dark', isDark.toString())
      document.documentElement.classList.toggle('is-dark', isDark)
    }
  }, [isDark])

  return (
    <label className={label} htmlFor='color-mode-switch'>

      <input
        className='visually-hidden'
        type='checkbox'
        id='color-mode-switch'
        onChange={() => setDark(!isDark)}
        checked={isDark}
      />

      <span className='visually-hidden'>Color mode switch</span>

      { isDark ? <BiSun className={icon} /> : <BiMoon className={icon} /> }

    </label>
  )
}

export { ColorModeSwitch }
