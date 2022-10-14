import { React,useState } from 'react'
import axios from 'axios';


const Leaderboard = () => {
  const [topScores, setScores ] =useState([])
  const getAllScores = () => {
    try {
      const { data } = axios.get('http://localhost:5001/players')
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <>
    <div>Leaderboard</div>
    
    <ul>
          {
            topScores.map((username,score, idx) => {
              return <li key={idx}>{username},{score}</li>
            })
          }
        </ul>
        </>
  )
}

export default Leaderboard
