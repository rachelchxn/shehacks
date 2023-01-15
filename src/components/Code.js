import { onAuthStateChanged, signOut } from 'firebase/auth';
import { arrayUnion, doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import Footer from './Footer'
import { useParams } from 'react-router-dom'
import QRCode from 'react-qr-code';

const Code = () => {
    const [userid,setuserid] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const [value, setValue] = useState(auth.currentUser.uid);
    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(256);

    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    useEffect(()=>{
        getData(value)
      }, [])
    
      async function getData(user) {
          const docRef = doc(db, "users", user);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              setName(docSnap.data().name)
              setTitle(docSnap.data().title)
          } else {
              console.log("No such document!");
          }
          setIsLoading(false)
      }


  return (
    <div  className='body-wrapper'>
        <div>
        <div className='page-wrapper'>
            <div className='container'>
                <h2 className='center-horizontal'>{name}</h2>
                <h3 className='center-horizontal'>{title}</h3>
                <div className="Generate">
            {value && (
        <center>
        <QRCode
            title="GeeksForGeeks"
            value={value}
            bgColor={back}
            fgColor={fore}
            size={size === '' ? 0 : size}
        />
        </center>
        )}
            <Link to='/scan'><button className='cam-btn main-btn'>Open Camera to Scan</button></Link>
        </div>
            </div>
        </div>
        <Footer/>
        </div>
        
    </div>

  )
}

export default Code