import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Footer from './Footer'
import OutputBlock from './OutputBlock'
import PromptGenerator from '../Cohere'
import axios from 'axios';
const Prompt = () => {
    
    const [topic, setTopic] = useState('')
    const [currentInput, setCurrentInput] = useState('')
    let value = ''
    const [outputList, setOutputList] = useState('')

    const promptGen = async (topic) => {

        let response = ""

        const options = {
            method: 'POST',
            url: 'https://api.cohere.ai/generate',
            headers: {
                accept: 'application/json',
                'Cohere-Version': '2022-12-06',
                'content-type': 'application/json',
                authorization: 'Bearer 38Gar8JHT8XDYH6F4TjqmIe5OdCrefiwfoPiz01T'
            },
            data: {
                model: 'command-xlarge-20221108',
                max_tokens: 20,
                return_likelihoods: 'NONE',
                truncate: 'END',
                prompt: "Give me one coffee chat questions to ask to a recruiter" + topic,
                //stop_sequences: ["\n"],
                temperature: 1.2, 
            }
        };

        const cohereResponse = await axios
            .request(options)
            .then(function (response) {
                prompt = response.data.prompt
                response = response.data.generations[0].text
               
                return response
            })
            .catch(function (error) {
                console.error(error);
            });

            return cohereResponse;
        

    }


    const handleGenerate = async () => {
        const prompts = await promptGen(topic);
        // take topic as cohere api's prompt generator
        setOutputList([...outputList, prompts])
        setTopic('')
    }

    const handleDelete = (item) => {
        setOutputList(outputList.filter((i) => i !== item ))
        //console.log(outputList)
    }

  return (
    <div  className='body-wrapper'>
        <div className='page-wrapper'>
            <container className='container'>
                <div className='card'>
                    <h3>Prompt Generator</h3>
                    <div className='input-field'>
                        <label>Topic</label>
                <input onChange={event => {
                    setTopic(event.target.value)
                    
                    } } value={topic} placeholder='What do you want to talk about?'/>
                    </div>
                    <button onClick={handleGenerate} className='main-btn'>Generate</button>
                </div>
                <div>
                    {outputList && outputList.map((item) => (
                        <OutputBlock item={item} key={item} 
                        onDelete={handleDelete} 
                        />
                    ))
                    }
                </div>
                {/* <PromptGenerator setOutputList={setOutputList}> </PromptGenerator> */}
            </container>
        </div>
        <Footer/>
    </div>
  )
}

export default Prompt