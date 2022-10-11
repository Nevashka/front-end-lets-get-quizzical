import React from 'react'
import { Link } from 'react-router-dom'
import { Settings, Room} from '../index'

const Home = () => {
  return (
    <>
      <div>
        <h1>Welcome to Let's get Quzzical!</h1>
        <div id='Container'>
          <p>Please select an option: </p>
          <div id='buttons'>
          <Link to='/Settings'>
            <button>Create a Room</button>
          </Link>
          <Link to='/Room'> 
            <button>Join a Room</button>
          </Link>
        </div>
        </div>
      </div>
    </>
  )
}

export default Home