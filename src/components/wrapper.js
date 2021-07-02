import React from 'react'
import * as style from '../styles/wrapper.module.css'

const Wrapper = ({ variant, children }) => {
  return (
    <div className={style[variant] ?? style.normal}>
      {children}
    </div>
  )
}

export { Wrapper }
