import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { db, auth } from '../firebase' 
// import { useAuth } from '../context/AuthContext';

const Signup = () => {
    // const { signup } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()

    const auth = getAuth();


    const createAccount = (event) => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        }

  return (
    <div  className='body-wrapper'>
        <div className='page-wrapper'>
            <div className='container'>
                <h3 className='logo'>Brewmate</h3>
                <div className='card'>
                    <form onSubmit={createAccount}>
                        <div className='input-field'>
                            <label>Email</label>
                            <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label>Password</label>
                            <input ref={passwordRef} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='main-btn'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup