//socket between room and server?
//Game is called here?
//create a user socket in the server and in the client
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom'


import './style.css'

const socket = io('http://localhost:5001');

const Room = () => {
  const [ hidden, sethidden] = useState(false)
  const [roomName, setRoomName] = useState(null);
  const [numPlayers, setNumPlayers] = useState(0)
  const [username, setUsername] = useState(null)
  const [players, setPlayers] = useState(['tony'])

  useEffect(() => {
    socket.on('join error', msg => console.log(msg))
    
    socket.on('room size', data => {
      console.log(data)
        setNumPlayers(data)
    } )

    socket.on('add player', data => {

      console.log('updating players')
      setPlayers(data)

    })
  }, []);

  const handleChangeRoom = (e) => {
    setRoomName(e.target.value)
  }
  const handleChangeName = (e) => {
    setUsername(e.target.value)
  }
  const joinRoom = () => {
    console.log('joining room:', roomName)
    socket.emit('join room', {room:roomName, player:username})
    sethidden(!hidden) // set hidden to true
  }

  const startGame = () => {
    console.log('starting the game')

  }

  return (
    <>
      <h1>Room</h1>

      <div id="join-button">
          <label>Username:</label>
          <input id="username" type="text" hidden={hidden} onChange={handleChangeName} style={{backgroundColor:'white', color:'black'}}></input>
          <label>Room Name:</label>
          <input id="roomname" type="text" hidden={hidden} onChange={handleChangeRoom} style={{backgroundColor:'white', color:'black'}}></input>
          <button id="join" onClick={joinRoom} hidden={hidden}>Join Room</button>
          <button id='play' hidden={!hidden} onClick={startGame}>Play!</button>
      </div>

      <div id="players">
          <p>Players in the game: {numPlayers}</p>
          <p> Players in game:</p>
          <ul>
          {
            players.map((player,i) => {
              return <li key={i}>{player}</li>
            })
          }
          </ul>
      </div>

    </>
  )
}

export default Room
