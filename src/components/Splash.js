
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Splash = () => {

const navigate = useNavigate()

function toSignup() {
    navigate('/signup')
}

function toLogin() {
    navigate('/login')
}

  return (
    <div  className='body-wrapper'>
        <div className='page-wrapper'>
            <div className='container'>
                <h3 className='logo'>Brewmates</h3>
                <div className='card center-vertical'>
                    <h2 className='welcome'>Welcome to Brewmates</h2>
                    <button onClick={toSignup} className='main-btn'>Sign Up</button>
                    <button onClick={toLogin} className='alt-btn'>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Splash