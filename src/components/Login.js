import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase' 
// import { useAuth } from '../context/AuthContext';

const Login = () => {
    // const { signup } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()

    const auth = getAuth();

    const navigate = useNavigate()

    const loginUser = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }

  return (
    <div  className='body-wrapper'>
        <div className='page-wrapper'>
            <div className='container'>
                <h3 className='logo'>Brewmate</h3>
                <div className='card center-vertical'>
                    <h2>Login</h2>
                    <form onSubmit={loginUser}>
                        <div className='input-field'>
                            <label>Email</label>
                            <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label>Password</label>
                            <input ref={passwordRef} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='main-btn'>Login</button>
                    </form>
                </div>
            </div>
            <p className='center-horizontal'>Don't have an account? <span><Link className='span-link' to='/signup'>Signup</Link></span></p>
        </div>
    </div>
  )
}

export default Login