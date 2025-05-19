import React from 'react'
import './index.less'

export default function Header(props) {
  return (
    <div className='header'>
      <div className='header-title'>
        {props.children}
      </div>
    </div>
  )
}
