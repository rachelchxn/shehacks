import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import Footer from './Footer'

const Profile = () => {

  const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [interests, setInterests] = useState('')

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
            setEmail(docSnap.data().email)
            setLinkedin(docSnap.data().linkedin)
            setInterests(docSnap.data().interests)
        } else {
            console.log("No such document!");
        }
        setIsLoading(false)
    }

  const handleLogout = () => {               
    signOut(auth).then(() => {
        navigate("/");
        console.log("Signed out successfully")
    }).catch((error) => {
      console.log(error)
    });
  }

  const handleEdit = () => {
    navigate('/edit-profile')
  }


  return (
    <div  className='body-wrapper'>
      {!isLoading && 
      <div>
      <div className='page-wrapper'>
            <container className='container'>
                <div className='card'>
                  <div className='profile-header'>
                  <h1 className='center-horizontal'>{name}</h1>
                  <h4 className='center-horizontal'>{title}</h4>
                  <p className='center-horizontal'>{bio}</p>
                  </div>
                  <h4>Interests:</h4>
                  <p>{interests}</p>
                  <h4>Linkedin:</h4>
                  <a className='linkedin-link' href={linkedin} target='_blank'>{linkedin}</a>
                  <h4>Email:</h4>
                  <p>{email}</p>
                  <div className='button-container'>
                    <button onClick={handleEdit} className='main-btn'>Edit Profile</button>
                    <button onClick={handleLogout} className='alt-btn'>Logout</button>
                  </div>
                </div>
            </container>
        </div>
        <Footer/>
        </div>
      }
    </div>
  )
}

export default Profile