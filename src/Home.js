import React from 'react'

const Home = () => {

    const first_name = 'Jane'
    const level = 10

  return (
    <div>
        <container>
            <h2>Welcome back {first_name}</h2>
            <div className='level'>
                <div className='progress-container'>
                    <div className='progress-bar'></div>
                </div>
                <div>
                    <h1>Level {level}</h1>
                    <h3></h3>
                </div>
            </div>
        </container>
    </div>
  )
}

export default Home