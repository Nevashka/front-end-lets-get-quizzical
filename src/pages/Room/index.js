
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
import { BackButton  } from '../../components';
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
  const [index, setIndex] = useState('loading questions...')
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
      
      setQuestions(data)
      // console.log('data',data)
      // setQuestions(questions)
      // console.log(data)
    })
    socket.on('load question', index => {
      setRenderQuestion((prev) => {
        prev[index] = !prev[index]
        return[...prev]
      })
      getAnswers(index)
      
      setIndex(`Question: ${index + 1}`)
    })
    

  }, []);

  const getAnswers = (index) => {
    let options = []
    let incorrect = decode(questions[index].incorrect_answers)
    let correct = decode(questions[index].correct_answer)
    socket.on('send questions', (data) => {
      // setQuestions(data)
      // console.log(data)
    })

    const incorrectOptions = incorrect.map(ans => options.push(ans))
    const correctOptions = options.push(correct)

    setAnswers(options.sort(() => Math.random() - 0.5))
  
}
  const handleQuestions = () => {
    socket.emit('share questions', questions)

  const getAnswers = (index) => {
    let options = []
    let incorrect = decode(questions[index].incorrect_answers)
    let correct = decode(questions[index].correct_answer)
    socket.on('send questions', (data) => {
      setQuestions(data)
      // console.log(data)
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
    socket.emit('starting the game', { room: roomName })
    socket.emit('start', 'we done it')


  }

  const removeElement = () => {
    setVisible((prev) => !prev)
  }

  function onClickFunctions() {
    
    removeElement();
    startGame()
    
    


  }
  console.log('Q',Questions)
  console.log('q',questions)
  return (
    <>
      {visible && <div id='room' >

        <div id="join-button">

          <label hidden={hidden} > Username:</label>
          <input id="username" type="text" hidden={hidden} onChange={handleChangeName} style={{ backgroundColor: 'white', color: 'black' }}></input>
          <label >Room: {roomName} </label>
          <input id="roomname" type="text" hidden={hidden} onChange={handleChangeRoom} style={{ backgroundColor: 'white', color: 'black' }}></input>
          <button id="join" onClick={joinRoom} hidden={hidden}>Join Room</button>
          <button id='play' hidden={!hidden} onClick={onClickFunctions}>Start Game</button>


        </div>

        <div id="players">
          {visible && <p>Total players waiting: {numPlayers}</p>}
          <p hidden={hidden}> Players in game:</p>
          <ul hidden={hidden}>
            {
              players.map((player, i) => {
                return <li key={i}>{player}</li>
              })
            }
          </ul>
        </div>
        {visible && <BackButton hidden={hidden} />}

      </div>}
      

      {!visible &&<div id='questions' >
      <div>
        <h2> {index} </h2>

        <ul>
          <li hidden={!renderQuestion[0]}>{decode(questions[0].question)}</li>
          <li hidden={!renderQuestion[1]}>{decode(questions[1].question)}</li>
          <li hidden={!renderQuestion[2]}>{decode(questions[2].question)}</li>
          <li hidden={!renderQuestion[3]}>{decode(questions[3].question)}</li>
          <li hidden={!renderQuestion[4]}>{decode(questions[4].question)}</li>
          <li hidden={!renderQuestion[5]}>{decode(questions[5].question)}</li>
          <li hidden={!renderQuestion[6]}>{decode(questions[6].question)}</li>
          <li hidden={!renderQuestion[7]}>{decode(questions[7].question)}</li>
          <li hidden={!renderQuestion[8]}>{decode(questions[8].question)}</li>
          <li hidden={!renderQuestion[9]}>{decode(questions[9].question)}</li>

          <div >
          {
            answers.map((ans, i) => {
              return <button key={i}>{ans}</button>
            })
          }
        </div>
        </ul>
      </div>
        
           

      </div>}
    </>
  )
}

export default Room
