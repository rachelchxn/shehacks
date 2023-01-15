import { onAuthStateChanged, signOut } from 'firebase/auth';
import { arrayUnion, doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import Footer from './Footer'
import { useParams } from 'react-router-dom'

const AddUser = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const {user} = useParams()

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [interests, setInterests] = useState('')

  useEffect(()=>{
    getData(user)
  }, [])

  async function getData(user) {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          setName(docSnap.data().name)
          setTitle(docSnap.data().title)
          setBio(docSnap.data().bio)
          setInterests(docSnap.data().interests)
      } else {
          console.log("No such document!");
      }
      setIsLoading(false)
  }

const handleAdd = async () => {               
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    connections: arrayUnion(user),
    points: increment(200)
  });
  navigate('/connections')
}

const handleClose = () => {
  navigate('/connections')
}


return (
  <div  className='body-wrapper'>
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
                <div className='button-container'>
                    <button onClick={handleAdd} className='main-btn'>Add Connection</button>
                  <button onClick={handleClose} className='alt-btn'>Cancel</button>
                </div>
              </div>
          </container>
      </div>
      <Footer/>
  </div>
)
}
export default AddUser