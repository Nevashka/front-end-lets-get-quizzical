import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Home = () => {
  return (
   
    <div id='home'>
      <div id='container'>
        <h1 id='head'>Let's get Quzzical!</h1>
        
        <div id='card'>
        <p>A fun multiplayer quiz game. Select a category and challenge your friends! </p>
          <div id='homeBtns'>
          <Link to='/Settings'>
            <button>Create a Room</button>
          </Link>
          <Link to='/Room'> 
            <button>Join a Room</button>
          </Link>
        </div>
        </div>
      </div>
    </div>
    
  )
}

export default Home
