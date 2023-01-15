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
                model: 'command-xlarge-20221108',
                max_tokens: 20,
                return_likelihoods: 'NONE',
                truncate: 'END',
                prompt: "Give me coffee chat questions to ask a recruiter\nFinance What are some of the biggest challenges facing the finance industry today?\nTechnology What were your favourite projects in your past roles?\nHealthcare What motivated you to pursue a career in healthcare? \nConstruction What inspired you to pursue a career in construction?\nRetail What motivated you to pursue a career in retail?\nService What inspired you to pursue a career in the service industry?\nEducation What were some of the most rewarding moments in your previous role?\nFinance What are some of the major issues within the finance industry?\nTechnology What were your favourite projects in your past roles?\nHealthcare What motivated you to pursue a career in healthcare?\nFinance What are some tips for people wanting to pursue this career?\nHealthcare What is the hardest part about working in healthcare?\nHealthcare What do you like about your job, and what do you dislike?\nFinance What are some of the major issues within the finance industry?\nFinance What are some tips you have for job seekers looking to work in the finance industry?\nFinance How does your typical day look like?\nFinance What are some tips you have for job seekers looking to work in the finance industry?\n" + "Finance What are some of the most important issues for the finance industry?\nTechnology What are some interesting projects you are currently working on?\nHealthcare What is your favourite part of your job?\nConstruction What is your favourite part of your job?\nRetail What is your favourite part of your job?\nService What is your favourite part of your job?\nEducation What is your favourite part of your job?\nRetail What is your favourite part of your job?\nService What is your favourite part of your job?\nEducation What are some of the most rewarding moments in your previous role?\nRetail What are some tips you have for job seekers looking to work in the retail industry?\nRetail What is your favourite part of your job?\nConstruction What is your favourite part of your job?\nService What is your favourite part of your job?\nEducation What are some of the most rewarding moments in your previous role?\nConstruction What is your favourite part of your job?\nTechnology What are some interesting projects you are currently working on?\nFinance What are some of the most important issues for the finance industry?\nHealthcare What are some tips you have for job seekers looking to work in the healthcare industry?\nFinance What do you wish you knew when you started in the industry?\nEducation What are some of the most rewarding moments in your previous role?\nRetail What are some of the most important issues for the retail industry?\nService What do you think is the biggest issue for the service industry?\nRetail What do you like about your day-to-day tasks?\nConstruction What do you like about your day-to-day tasks?\nEducation What are some of the most rewarding moments in your previous role?\nFinance What are some of the biggest challenges facing the finance industry today?\nTechnology What were your favourite projects in your past roles?\nHealthcare What motivated you to pursue a career in healthcare?\nHealthcare How did you get started in your career?\nConstruction How did you get started in your career?\nService How did you get started in your career?\nRetail How did you get started in your career?\nFinance How did you get started in your career?\nTechnology How did you get started in your career?\nEngineering How did you get started in your career?\nEngineering How did you get started in your career?\nTechnology How did you get started in your career?\nRetail How did you get started in your career?\nService How did you get started in your career?\nConstruction How did you get started in your career?\nHealthcare How did you get started in your career?\nEducation How did you get started in your career?\nConstruction How did you get started in your career?\nService How did you get started in your career?\nEducation What were some of the most rewarding moments in your previous role?\nService What do you think is the biggest issue for the service industry?\nRetail What do you like about your day-to-day tasks?\nConstruction What do you like about your day-to-day tasks?\nConstruction Do you have recommendations for resources I should explore to better understand the industry?\nService Do you have recommendations for resources I should explore to better understand the industry?\nEducation Do you have recommendations for resources I should explore to better understand the industry?\nHospitality Do you have recommendations for resources I should explore to better understand the industry?\nService Do you have recommendations for resources I should explore to better understand the industry?\nRetail Do you have recommendations for resources I should explore to better understand the industry\nTechnology Do you have recommendations for resources I should explore to better understand the industry?\nFinance Do you have recommendations for resources I should explore to better understand the industry?\nConstruction Do you have recommendations for resources I should explore to better understand the industry?\nHealthcare Do you have recommendations for resources I should explore to better understand the industry?\nEducation Do you have recommendations for resources I should explore to better understand the industry?\nService Do you have recommendations for resources I should explore to better understand the industry?\nHospitality Do you have recommendations for resources I should explore to better understand the industry?\nService Do you have recommendations for resources I should explore to better understand the industry?\nRetail Do you have recommendations for resources I should explore to better understand the industry?\n"                + topic ,
                stop_sequences: ["\n"],
                temperature: 1, 
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