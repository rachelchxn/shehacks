import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase' 
// import { useAuth } from '../context/AuthContext';

const CreateProfile = () => {
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [bio, setBio] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [interests, setInterests] = useState('')

    const auth = getAuth();
    
    const navigate = useNavigate()

    const updateProfile = async(event) => {
        event.preventDefault()
        console.log('working')
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: name,
            title: title,
            bio: bio,
            linkedin: linkedin,
            interests: interests
          },
          {merge: true});
        navigate('/')
    }


  return (
    <div  className='body-wrapper'>
        <div className='page-wrapper'>
            <div className='container'>
                <h3 className='logo'>Brewmate</h3>
                <div className='card create-profile'>
                    <h2>Create Your Profile</h2>
                    <form onSubmit={updateProfile}>
                        <div className='input-field'>
                            <label>Name</label>
                            <input value={name} placeholder='Jane Smith' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label>Title</label>
                            <input value={title} placeholder='CEO of Amazon' onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label>Bio</label>
                            <textarea value={bio} placeholder='The best CS intern to have ever existed.' onChange={(e) => setBio(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label>Linkedin</label>
                            <input value={linkedin} placeholder='linkedin.com/in/user' onChange={(e) => setLinkedin(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label>Interests (separated by commas)</label>
                            <textarea value={interests} placeholder='coding, eating, making money...' onChange={(e) => setInterests(e.target.value)} />
                        </div>
                        
                        <button className='main-btn'>Finish</button>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default CreateProfile