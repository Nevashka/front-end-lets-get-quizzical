//socket between room and server?
//Game is called here?
//create a user socket in the server and in the client
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link,Outlet } from 'react-router-dom'
import { fetchQuestions } from '../../actions';
import { useSelector, useDispatch } from 'react-redux'

import { Questions } from '../../pages'
import './style.css'

const socket = io('http://localhost:5001');

const Room = () => {
  const [hidden, sethidden] = useState(false)
  const [roomName, setRoomName] = useState(null);
  const [numPlayers, setNumPlayers] = useState(0)
  const [username, setUsername] = useState(null)
  const [players, setPlayers] = useState([''])
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    socket.on('join error', (msg) => {
      console.log(msg)
      sethidden(false)
    })
    socket.on('room full error', (msg) => {
      console.log(msg)
      sethidden(false)
    })
    
    socket.on('room size', data => {
      console.log(data)
      setNumPlayers(data)
    })

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
    socket.emit('join room', { room: roomName, player: username })
    sethidden(!hidden) // set hidden to true
  }

  const startGame = () => {
    console.log('starting the game')
  
  }
  
  const removeElement = () => {
    setVisible((prev) => !prev)
  }

  function onClinckFunctions () {
    removeElement();
    startGame()
  }

  return (
    <>
      <h1>Room</h1>

      <div id="join-button">
        
        <label hidden={hidden} > Username:</label>
        <input id="username" type="text" hidden={hidden} onChange={handleChangeName} style={{ backgroundColor: 'white', color: 'black' }}></input>
        <label >Room: {roomName} </label>
        <input id="roomname" type="text" hidden={hidden} onChange={handleChangeRoom} style={{ backgroundColor: 'white', color: 'black' }}></input>
        <button id="join" onClick={joinRoom} hidden={hidden}>Join Room</button>
        {visible && <Link to='Questions'><button id='play' hidden={!hidden} onClick={onClinckFunctions}>Start Game</button></Link>}
        

        <Outlet />
      </div>

      <div id="players">
        <p >Total players waiting: {numPlayers}</p>
        <p hidden={hidden}> Players in game:</p>
        <ul hidden={hidden}>
          {
            players.map((player, i) => {
              return <li key={i}>{player}</li>
            })
          }
        </ul>
      </div>

    </>
  )
}

export default Room
