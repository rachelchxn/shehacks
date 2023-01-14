import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Footer from './Footer'
import OutputBlock from './OutputBlock'

const Prompt = () => {
    
    const [topic, setTopic] = useState('')
    let value = ''
    const [outputList, setOutputList] = useState(['hello', 'hi', 'yo'])

    const handleGenerate = () => {
        setOutputList([...outputList, topic])
        setTopic('')
    }

    const handleDelete = (item) => {
        setOutputList(outputList.filter((i) => i !== item ))
        console.log(outputList)
    }

  return (
    <div  className='body-wrapper'>
        <div className='page-wrapper'>
            <container className='container'>
                <div className='card'>
                    <h3>Prompt Generator</h3>
                    <div className='input-field'>
                        <label>Topic</label>
                        <input onChange={event => setTopic(event.target.value)} value={topic} placeholder='What do you want to talk about?'/>
                    </div>
                    <button onClick={handleGenerate} className='main-btn'>Generate</button>
                </div>
                <div>
                    {outputList && outputList.map((item) => (
                        <OutputBlock item={item} key={item.id} 
                        onDelete={handleDelete} 
                        />
                    ))
                    }
                </div>
            </container>
        </div>
        <Footer/>
    </div>
  )
}

export default Prompt