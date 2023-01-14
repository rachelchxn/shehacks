import React from 'react'
import { Link } from "react-router-dom"
import Footer from './Footer'

const Home = () => {

    const firstName = 'Jane'
    const level = 10
    const userPoints = 600
    const totalPoints = 1000

  return (
    <div  className='body-wrapper'>
        <div className='page-wrapper'>
            <container className='container'>
                <h3 className='logo'>Brewmate</h3>
                <h2>Welcome back, {firstName}</h2>
                <div className='level'>
                    <div className='progress-container'>
                        <div className='progress-bar'></div>
                    </div>
                    <div>
                        <h1>Level {level}</h1>
                        <h3>{userPoints}/{totalPoints} points</h3>
                    </div>
                </div>
                <div className= 'scan-btn-container card'>
                    <Link to='/scan'><button className='main-btn'>Scan to Connect</button></Link>
                </div>
            </container>
        </div>
        <Footer/>
    </div>
  )
}

export default Home