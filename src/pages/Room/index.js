//socket between room and server?
//Game is called here?
//create a user socket in the server and in the client
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
import { BackButton, Questions } from '../../components';
import { Card, Avatar, Container, ThemeProvider, Box, Typography, flexbox } from '@mui/material'

import './style.css'

const socket = io('http://localhost:5001');

const Room = () => {
  const questions = useSelector(state => state.questions)
  const [hidden, sethidden] = useState(false)
  // const [reveal,setReveal] = useState(false)
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
    socket.on('Begin', data => {
      console.log('lets begin innit')
      setVisible(false)
    })


  }, []);
  const handleQuestions = () => {
    socket.emit('share questions', questions)

  }

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
    socket.emit('starting the game', { room: roomName })
    socket.emit('start', 'we done it')


  }

  const removeElement = () => {
    setVisible((prev) => !prev)
  }
  
  const getQuestions = () =>  {
    render (<Questions/>)
  } 

  function onClickFunctions() {
    removeElement();
    startGame()
    handleQuestions()
  }

  
  return (
   
      <div id='room'  >
      
        {visible && <div id="join-button">

          <label hidden={hidden} > Username:</label>
          <input id="username" type="text" hidden={hidden} onChange={handleChangeName} style={{ backgroundColor: 'white', color: 'black' }}></input>
          <label >Room: {roomName} </label>
          <input id="roomname" type="text" hidden={hidden} onChange={handleChangeRoom} style={{ backgroundColor: 'white', color: 'black' }}></input>
          <button id="join" onClick={joinRoom} hidden={hidden}>Join Room</button>
          <button id='play' hidden={!hidden} onClick={onClickFunctions}>Start Game</button>

        </div>}
        

          {visible && <div id="players">
          <p>Total players waiting: {numPlayers}</p>
          <p hidden={hidden}> Players in game:</p>
          <ul hidden={hidden}>
            {
              players.map((player, i) => {
                return <li key={i}>{player}</li>
              })
            }
          </ul>
          </div>}

        <BackButton hidden={hidden} />
        
      
      
       {!visible && <div id='questions' >
        <Questions/>
       </div>}
     
   </div>
  )
}

export default Room
