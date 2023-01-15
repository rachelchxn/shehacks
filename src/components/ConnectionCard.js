import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, redirect } from "react-router-dom"
import { auth, db } from '../firebase'

const ConnectionCard = (props) => {

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    console.log(props.uid)

    async function getData(uid) {
        const docRef = doc(db, "users", uid);
        console.log(docRef)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setName(docSnap.data().name)
            setBio(docSnap.data().bio)
            setEmail(docSnap.data().email)
            console.log(name)
        } else {
            console.log("No such document!");
        }
    }

    getData(props.uid)

  return (
    <div className='card connection' onClick={() => props.onOpen(props.uid)}>
        <h2>{name}</h2>
        <p>{bio}</p>
        <p>{email}</p>
    </div>
  )
}

export default ConnectionCard