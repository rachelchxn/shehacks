import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, redirect } from "react-router-dom"
import { auth, db } from '../firebase'
import Footer from './Footer'

const Code = () => {

    const level = 10
    const userPoints = 600
    const totalPoints = 1000

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    const [name, setName] = useState('')

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getData(user)
            } else {
                navigate('/signup')
            }
          })
    }, [])

    async function getData(user) {
        
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setName(docSnap.data().name)
        } else {
            console.log("No such document!");
        }
        setIsLoading(false)
    }

  return (
    <div  className='body-wrapper'>
        {!isLoading &&
        <div>
        <div className='page-wrapper'>
            <div className='container'>
                <h3>QR CODE</h3>
                    <Link to='/scan'><button className='main-btn'>Open Camera to Scan</button></Link>
            </div>
        </div>
        <Footer/>
        </div>
        }
    </div>
  )
}

export default Code