import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase' 
// import { useAuth } from '../context/AuthContext';

const EditProfile = () => {
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [bio, setBio] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [interests, setInterests] = useState('')

    const auth = getAuth();
    
    const navigate = useNavigate()

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
            setTitle(docSnap.data().title)
            setBio(docSnap.data().bio)
            setLinkedin(docSnap.data().linkedin)
            setInterests(docSnap.data().interests)
        } else {
            console.log("No such document!");
        }
        // setIsLoading(false)
    }
    

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
        navigate('/profile')
    }

    const cancelChanges = () => {
        navigate('/profile')
    }

  return (
    <div  className='body-wrapper'>
        <div className='page-wrapper'>
            <div className='container'>
                <div className='card'>
                    <h2>Edit Profile</h2>
                    <form>
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
                        <div className='button-container'>
                            <button onClick={updateProfile} className='main-btn'>Save Changes</button>
                            <button onClick={cancelChanges} className='alt-btn'>Cancel</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default EditProfile