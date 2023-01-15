import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase' 
// import { useAuth } from '../context/AuthContext';

const Signup = () => {
    // const { signup } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()

    const auth = getAuth();

    const navigate = useNavigate()

    const createAccount = (event) => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            addToCloud(user)
            navigate('/create-profile')
        })
        .catch((error) => {
            console.log(error)
        });

    }
    
    async function addToCloud(user) {
        console.log('working')
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: email,
            level: 0,
            points: 0,
          });
    }

  return (
    <div  className='body-wrapper'>
        <div className='page-wrapper'>
            <div className='container'>
                <h3 className='logo'>Brewmates</h3>
                <div className='card center-vertical'>
                    <h2>Get Started</h2>
                    <form onSubmit={createAccount}>
                        <div className='input-field'>
                            <label>Email</label>
                            <input ref={emailRef} value={email} id='email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label>Password</label>
                            <input ref={passwordRef} value={password} id='password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='main-btn'>Sign Up</button>
                    </form>
                </div>
                <p className='center-horizontal'>Already have an account? <span><Link className='span-link' to='/login'>Login</Link></span></p>
            </div>
        </div>
    </div>
  )
}

export default Signup