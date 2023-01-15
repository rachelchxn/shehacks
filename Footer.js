import React from 'react'
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer>
        <container className='nav-links'>
            <Link to='/'>Home</Link>
            <Link to='/prompt'>Prompt</Link>
            <Link to='/connections'>Connections</Link>
            <Link to='/profile'>Profile</Link>
        </container>
        </footer>
  )
}

export default Footer