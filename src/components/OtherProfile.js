import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc,collection, getDoc, setDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import Footer from './Footer'
import { useParams } from 'react-router-dom'

const OtherProfile = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const {profile} = useParams()

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [interests, setInterests] = useState('')

  const [notes, setNotes] = useState('')


  useEffect(()=>{
    getData(profile)
    getNotesData(auth.currentUser.uid)
    setIsLoading(false)
  }, [])

  async function getData(user) {
      const docRef = doc(db, "users", user);
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
    }
  async function getNotesData(user) {

      const docRefSelf = doc(db, "users", auth.currentUser.uid, 'connections');
      const docSnapSelf = await getDoc(docRefSelf);
      if (docSnapSelf.exists()) {
          setNotes(docSnapSelf.data().notes)
      } else {
          console.log("No such document!");
      }
      
    }
    //   console.log(validURL(linkedin))

  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }


const handleClose = () => {
  navigate('/connections')
}

const [editNotes, setEditNotes] = useState(false)

const handleEdit = async () => {
  setEditNotes(true)
  await setDoc((db, "users", auth.currentUser.uid), {
    'connections.hCT18dQ1L5PXe8mPq0nf7vLbhSh2': 'hello there'
  },
  {merge: true});
navigate('/profile')
}

const updateNotes = async(event) => {
    event.preventDefault()
    console.log('working')
    await setDoc((db, "users", auth.currentUser.uid, 'connections', profile), {
        value: 'hello there'
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
                {/* <h4>Chat Notes:</h4>
                <div className='chat-notes'>
                    <p>{notes}</p>
                </div> */}
                <div className='button-container'>
                    {/* <button onClick={handleEdit} className='main-btn'>Edit Chat Notes</button> */}
                  <button onClick={handleClose} className='alt-btn'>Back to Connections</button>
                </div>
              </div>
          </container>
      </div>
      <Footer/>
  </div>
)
}

export default OtherProfile