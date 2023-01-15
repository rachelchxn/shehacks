import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, redirect } from "react-router-dom"
import { auth, db } from '../firebase'
import ConnectionCard from './ConnectionCard'
import Footer from './Footer'


const Connections = () => {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [connections, setConnections] = useState([])

  useEffect(()=>{
    setIsLoading(true)
        if (auth.currentUser) {
            getData(auth.currentUser)
        } else {
            navigate('/signup')
        }
      setIsLoading(false)
}, [])

async function getData(user) {
    
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        setConnections(docSnap.data().connections)
        console.log(connections)
    } else {
        console.log("No such document!");
    }
}

  return (
    <div className='body-wrapper'>
    {!isLoading &&
    <div>
        <div className='page-wrapper'>
            <container className='container'>
                <h3>Connections</h3>
                <div>
                    {connections && connections.map((item) => (
                        <ConnectionCard uid={item}/>
                    ))
                    }
                </div>
            </container>
        </div>
        <Footer/>
        </div>
        }
    </div>
    
  )
}

export default Connections