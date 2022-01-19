import React from 'react'
import logo from './logo.png'
import './index.less'
export default function Logo() {
  return (
    <div className='logo'>
      <img src={logo} alt="logo" className='logo-img'/>
    </div>
  )
}