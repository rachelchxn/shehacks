import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, redirect } from "react-router-dom"
import { auth, db } from '../firebase'
import Footer from './Footer'

const Home = () => {

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
                <h3 className='logo'>Brewmate</h3>
                <h2>Welcome back, {name}</h2>
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
            </div>
        </div>
        <Footer/>
        </div>
        }
    </div>
  )
}

export default Home