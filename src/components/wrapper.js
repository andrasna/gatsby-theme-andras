import React from 'react'
import { normal, post } from '../styles/wrapper.module.css'

const Wrapper = ({ variant, children }) => {
  if (variant === 'post') {
    return (
      <div className={post}>
        {children}
      </div>
    )
  }

  return (
    <div className={normal}>
      {children}
    </div>
  )
}

export { Wrapper }
