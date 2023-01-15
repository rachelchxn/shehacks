// import React, { useState } from 'react'
// import { Link } from "react-router-dom"
// import Footer from './Footer'
// import OutputBlock from './OutputBlock'

// const Prompt = () => {
    
//     const [topic, setTopic] = useState('')
//     let value = ''
//     const [outputList, setOutputList] = useState(['hello', 'hi', 'yo'])

//     const handleGenerate = () => {
//         setOutputList([...outputList, topic])
//         setTopic('')
//     }

//     const handleDelete = (item) => {
//         setOutputList(outputList.filter((i) => i !== item ))
//         console.log(outputList)
//     }

//   return (
//     <div  className='body-wrapper'>
//         <div className='page-wrapper'>
//             <container className='container'>
//                 <div className='card'>
//                     <h3>Prompt Generator</h3>
//                     <div className='input-field'>
//                         <label>Topic</label>
//                         <input onChange={event => setTopic(event.target.value)} value={topic} placeholder='What do you want to talk about?'/>
//                     </div>
//                     <button onClick={handleGenerate} className='main-btn'>Generate</button>
//                 </div>
//                 <div>
//                     {outputList && outputList.map((item) => (
//                         <OutputBlock item={item} key={item.id} 
//                         onDelete={handleDelete} 
//                         />
//                     ))
//                     }
//                 </div>
//             </container>
//         </div>
//         <Footer/>
//     </div>
//   )
// }

// export default Prompt

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
    //     let prompt = `Give me questions to ask recruiters during coffee chats
    // Industry: Workplace  
    // Startup Idea: A platform that generates slide deck contents automatically based on a given outline  
    // Startup Name: Deckerize  
    // --  
    // Industry: Home Decor  
    // Startup Idea: An app that calculates the best position of your indoor plants for your apartment  
    // Startup Name: Planteasy
    // --  
    // Industry: Healthcare  
    // Startup Idea: A hearing aid for the elderly that automatically adjusts its levels and with a battery lasting a whole week  
    // Startup Name: Hearspan
    
    // --  
    // Industry: Education  
    // Startup Idea: An online school that lets students mix and match their own curriculum based on their interests and goals  
    // Startup Name: Prime Age
    
    // --  
    // Industry: Productivity  
    // Startup Idea`


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
                max_tokens: 20,
                return_likelihoods: 'NONE',
                truncate: 'END',
                //MAKE THIS INTO NOT ONLY THE TOPIC BUT ALSO FEED IN OUR QUESTIONS (STRING APPEND)
                prompt: "1\nIndustry: Finance\nQuestion: What are some of the major issues within the finance industry?\n--\n2\nIndustry: Technology\nQuestion: What were your favourite projects in your past roles?\n–\n3\nIndustry: Healthcare\nQuestion: What motivated you to pursue a career in healthcare? \n–\n4\nIndustry: Finance\nQuestion: What are some tips for people wanting to pursue this career?\n–\n5\nIndustry: Healthcare\nQuestion: What is the hardest part about working in healthcare?\n--\n2\nIndustry: " 
                + topic
            }
        };

        const cohereResponse = await axios
            .request(options)
            .then(function (response) {
                prompt = response.data.prompt
                response = response.data.generations[0].text
               
                console.log(response,"is the response")
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