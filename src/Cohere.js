// // change name later
// const cohere = require('cohere-ai');
// Cohere.init('znMDclvwb5fP1W3EXCNOEze4');



// let prompt = `
// This program generates a startup idea and name given the industry.

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
// Startup Idea:`;

// const response = Cohere.generate({
//     model: 'xlarge',
//     prompt: prompt,
//     max_tokens: 40,
//     temperature: 0.6,
//     stop_sequences: ["--"]
// });\


// const startup_idea = 'Prediction: $response.generations[0].text;
// export console.log(startup_idea);

import axios from 'axios';
import React, { useState } from 'react';

function PromptGenerator() {
    console.log("prompt generator 47")

    function promptGen() {
        let prompt = `Give me questions to ask recruiters during coffee chats
    Industry: Workplace  
    Startup Idea: A platform that generates slide deck contents automatically based on a given outline  
    Startup Name: Deckerize  
    --  
    Industry: Home Decor  
    Startup Idea: An app that calculates the best position of your indoor plants for your apartment  
    Startup Name: Planteasy
    --  
    Industry: Healthcare  
    Startup Idea: A hearing aid for the elderly that automatically adjusts its levels and with a battery lasting a whole week  
    Startup Name: Hearspan
    
    --  
    Industry: Education  
    Startup Idea: An online school that lets students mix and match their own curriculum based on their interests and goals  
    Startup Name: Prime Age
    
    --  
    Industry: Productivity  
    Startup Idea`

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
                prompt: prompt
            }
        };

        axios
            .request(options)
            .then(function (response) {
                prompt = response.data.prompt
                response = response.data.generations[0].text
                document.getElementById("response").innerHTML = response
                document.getElementById("prompt").innerHTML = prompt

            })
            .catch(function (error) {
                console.error(error);
            });

        console.log("is it right: ", response)

    }

    async function fetchPrompts() {
        console.log("this is here")
        const cohere = require('cohere-ai');
        cohere.init('Lem8TSI2jnOqwR8AOwgQKhSi7zgxfWWL74AP7C8p');
        
        const response = await cohere.generate({
            model: 'xlarge',
            prompt: '1\nIndustry: Finance\nQuestion: What are some of the major issues within the finance industry?\n--\n2\nIndustry: Technology\nQuestion: What were your favourite projects in your past roles?\n–\n3\nIndustry: Healthcare\nQuestion: What motivated you to pursue a career in healthcare? \n–\n4\nIndustry: Finance\nQuestion: What are some tips for people wanting to pursue this career?\n–\n5\nIndustry: Healthcare\nQuestion: What is the hardest part about working in healthcare?',
            max_tokens: 100,
            temperature: 0.5,
            k: 0,
            p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop_sequences: ["--"],
            return_likelihoods: 'NONE'
        });
        return (`Here are some coffee chat questions: ${response.body.generations[0].text}`);
    };


    const [prompts, setPrompts] = useState('');
    fetchPrompts().then((response) => { setPrompts(response); })

    return (
''
        // <div >
        //     <p>HELLO WHY R U NOT WORKING</p>
        //     <button onClick={promptGen}>click me</button>
        //     <p id="prompt">Prompt default</p>
        //     <p id="response">Response default</p>
        // </div>

    );
}

export default PromptGenerator;
