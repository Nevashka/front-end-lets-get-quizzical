import { React,useState } from 'react'
import axios from 'axios';


const Leaderboard = () => {
  const [topScores, setScores ] =useState([])
  const getAllScores = () => {
    try {
      const { data } = axios.get('http://localhost:5001/players')
      // const leaderboard = data.map( d => {'username:' d.username, 'score:'d.score})
      // return leaderboard
    } catch (err) {
      throw new Error(err)
    }
  }

  //format scores as table instead of list
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
