import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Scan = () => {

  return (
    <div  className='body-wrapper'>
    <div>
    <div className='page-wrapper'>
        <div className='container'>
            <h3>Scan</h3>
                <Link to='/scan'><button className='main-btn'>Open Camera to Scan</button></Link>
        </div>
    </div>
    <Footer/>
    </div>
</div>
  )
}

export default Scan