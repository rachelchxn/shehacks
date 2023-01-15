import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, redirect } from "react-router-dom"
import { auth, db } from '../firebase'
import Footer from './Footer'

const Home = () => {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    const [name, setName] = useState('')
    const [level, setLevel] = useState(0)
    const [points, setPoints] = useState(0)

    const [height, setHeight] = useState(0)
    const ref = useRef(null)

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
            setLevel(docSnap.data().level)
            setPoints(docSnap.data().points)
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
                <h3 className='logo'>BrewMates</h3>
                <h2>Welcome back, {name}.</h2>
                <h3>Your coffee cup is {points/1000*100}% full.</h3>
                <div className='level'>
                    <div className='progress-container'>
                        <div className='progress-bar' style={{height: `${parseInt(points)/1000*100}%`}} ></div>
                    </div>
                    <div>
                        <h1>Level {level}</h1>
                        <h3>{points}/1000 points</h3>
                    </div>
                </div>
                <div className= 'scan-btn-container card'>
                    <Link to='/code'><button className='main-btn'>Scan to Connect</button></Link>
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