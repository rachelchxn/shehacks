import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, redirect } from "react-router-dom"
import { auth, db } from '../firebase'
import Footer from './Footer'
import QRCode from 'react-qr-code';

const Code = () => {
    // RACHEL RIGHT HERE 
    const [userid,setuserid] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const [value, setValue] = useState(auth.currentUser.uid);
    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(256);

    const level = 10
    const userPoints = 600
    const totalPoints = 1000

    const navigate = useNavigate()

    const [name, setName] = useState('')

  return (
    <div  className='body-wrapper'>
        {!isLoading &&
        <div>
        <div className='page-wrapper'>
            <div className='container'>
                <h3>QR CODE</h3>
            </div>
        </div>
        <Footer/>
        </div>
        }
        <div className="Generate">
            {value && (
        <center>
        <QRCode
            title="GeeksForGeeks"
            value={value}
            bgColor={back}
            fgColor={fore}
            size={size === '' ? 0 : size}
        />
        </center>
        )}

            <Link to='/scan'><button className='main-btn'>Open Camera to Scan</button></Link>
        </div>
    </div>

  )
}

export default Code