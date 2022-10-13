
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
import { BackButton, Questions } from '../../components';
import { decode } from "html-entities";

import './style.css'

const socket = io('http://localhost:5001');


const Room = () => {
  const questions = useSelector(state => state.questions)
  const [Questions, setQuestions] = useState([])
  const [hidden, sethidden] = useState(false)
  const [roomName, setRoomName] = useState(null);
  const [numPlayers, setNumPlayers] = useState(0)
  const [username, setUsername] = useState(null)
  const [players, setPlayers] = useState([''])
  const [visible, setVisible] = useState(true);
  const [answers, setAnswers] = useState([])
  const [questionNum, setQuestionNum] = useState('loading questions...')
  // const questionidx = useSelector(state => state.qidx)

  const [renderQuestion, setRenderQuestion] = useState([false, false, false, false, false, false, false, false, false, false])

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
    socket.on('send questions', (data) => {
      console.log(data)
      setQuestions(data)

      // console.log('data',data)
      // setQuestions(questions)
      // console.log(data)
    })
    socket.on('load question', index => {
      console.log(`loading question ${index + 1}`)
      setRenderQuestion((prev) => {
        prev[index] = !prev[index]
        return [...prev]
      })
      getAnswers(index)

      setQuestionNum(`Question: ${index + 1}`)
      console.log(' question number', questionNum)
    })


  }, []);


  const handleQuestions = () => {
    console.log('sharing questions')
    socket.emit('share questions', { data: questions, room: roomName })
  }
  const getAnswers = (index) => {
    console.log('getting answers')
    console.log(index)
    let options = []
    let incorrect = decode(Questions[index].incorrect_answers)
    let correct = decode(Questions[index].correct_answer)
    socket.on('send questions', (data) => {
      console.log('receiving the questions:', data)
      setQuestions(data)

    })

    const incorrectOptions = incorrect.map(ans => options.push(ans))
    const correctOptions = options.push(correct)

    setAnswers(options.sort(() => Math.random() - 0.5))
  };


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


  function onClickFunctions() {
    removeElement();
    handleQuestions()
    socket.emit('start', { room: roomName })
    console.log('starting room')
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

{/* 
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
      </div>} */}

      <BackButton hidden={hidden} />



      {!visible && <div id='questions' >
        <Questions />
      </div>}

    </div>
  )
}

export default Room;
