
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
import { BackButton } from '../../components';
import { decode } from "html-entities";

import './style.css'

const socket = io('http://localhost:5001');


const Room = () => {
  const questions = useSelector(state => state.questions)
  const [Questions, setQuestions] = useState([{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'},{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'},{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'},{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'},{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'},{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'},{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'},{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'},{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'},{question: 'question',incorrect_answers:['A','B','C'],correct_answer:'a'}])
  const [hidden, sethidden] = useState(false)
  const [roomName, setRoomName] = useState(null);
  const [numPlayers, setNumPlayers] = useState(0)
  const [username, setUsername] = useState(null)
  const [players, setPlayers] = useState([''])
  const [visible, setVisible] = useState(true);
  const [answers, setAnswers] = useState([])

  const [questionNum, setQuestionNum] = useState('loading questions...')
  const [buttonDisable, setButtonDisable] = useState([false,false, false, false, false, false, false, false, false, false, false])
  const [score, setScore] = useState(null)
  const [scoreState, setScoreState] = useState(false)
  const [choice, setChoice] = useState('')

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
      console.log(`loading question ${index + 1}`)
      setRenderQuestion((prev) => {

        prev[index] = true
        return[...prev]
      })
      setButtonDisable((prev) => {
        prev[index] = true
        return[...prev]
      })
      
      
      
      getAnswers(index)
      console.log(' question number',questionNum)
    })

    socket.on('load score', data => {
      setScoreState(true)
    })
    
    

  }, []);
  
  
  const handleQuestions = () => {
    console.log('sharing questions')
    socket.emit('share questions', {data:questions, room:roomName})
  }
  const getAnswers = (index) => {
    console.log('getting answers')
    console.log(index)
    setQuestionNum(`Question: ${index + 1}`)
    

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
    
    socket.emit('start', { room: roomName })
    
    
  }

  const removeElement = () => {
    setVisible((prev) => !prev)
  }

  function onClickFunctions() {

    removeElement();
    startGame()

    handleQuestions()
    
    
  }
  
  


  const handleClick = () =>{
    
    console.log('nada')
    setChoice('Wrong Choice!')
  }
  const handleClickCorrect = () =>{
    setScore((prev) => prev + 10)
    console.log('Correct!')
    setChoice(`Correct! Your score is: `)
  }
  
  // const disableButtons = (index) => {

  // }

  console.log('Q',Questions)
  console.log('q',questions)
  console.log('answers',answers)
  console.log('switch', renderQuestion)
  console.log('buttons', buttonDisable)
  console.log('Your score:', score)
  console.log('Choice', choice)
  

  return (
    <div id='Room'>
      {visible && <div id='room' >

        <div id="join-button">
          <h1 hidden={hidden}>Please join a room to play!</h1>
          <h1 hidden={!hidden}>You have joined {roomName}</h1>
          <label hidden={hidden} > Username: {username}</label>
          <input id="username" type="text" hidden={hidden} onChange={handleChangeName} ></input>
          <label  hidden={hidden}>Room: {roomName} </label>
          <input id="roomname" type="text" hidden={hidden} onChange={handleChangeRoom} ></input>
          <button id="join" onClick={joinRoom} hidden={hidden}>Join Room</button>
          <button id='play' hidden={!hidden} onClick={onClickFunctions}>Start Game</button>


        </div>

        <div id="players">
          {visible && <p>Total players waiting: {numPlayers}</p>}
          <p hidden={!hidden}> Players in game:</p>
          <ul hidden={!hidden}>
            {
              players.map((player, i) => {
                return <li key={i} >{player}</li>
              })
            }
          </ul>
        </div>
        {visible && <BackButton hidden={hidden} />}

      </div>}


      {!visible &&<div id='questions' >
      <div>
        <h2 id="questionnum"> {questionNum} </h2>

        <ul id='questions'>
          
          <h2>{choice}{score}</h2>
          <h2 id="finalscore" hidden={!scoreState}>Your Final Score is: {score}</h2>
          
          <li hidden={!renderQuestion[0]}>1. {decode(Questions[0].question)}</li>
          <div class="button-div">

            <button hidden={!renderQuestion[0]} onClick={handleClick} disabled={buttonDisable[1]} style = {{backgroundColor: buttonDisable[1] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[0].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[0]} onClick={handleClickCorrect} disabled={buttonDisable[1]}  style = {{backgroundColor: buttonDisable[1] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[0].correct_answer)}</button>
            <button hidden={!renderQuestion[0]} onClick={handleClick} disabled={buttonDisable[1]} style = {{backgroundColor: buttonDisable[1] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[0].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[0]} onClick={handleClick} disabled={buttonDisable[1]} style = {{backgroundColor: buttonDisable[1] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[0].incorrect_answers[2])}</button>
          
          </div>
          <li hidden={!renderQuestion[1]}>2. {decode(Questions[1].question)}</li>

          <div class="button-div">

            <button hidden={!renderQuestion[1]} onClick={handleClick} disabled={buttonDisable[2]} style = {{backgroundColor: buttonDisable[2] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[1].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[1]} onClick={handleClick}disabled={buttonDisable[2]} style = {{backgroundColor: buttonDisable[2] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[1].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[1]} onClick={handleClickCorrect}disabled={buttonDisable[2]} style = {{backgroundColor: buttonDisable[2] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[1].correct_answer)}</button>
            <button hidden={!renderQuestion[1]} onClick={handleClick}disabled={buttonDisable[2]} style = {{backgroundColor: buttonDisable[2] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[1].incorrect_answers[2])}</button>
          </div>
          <li hidden={!renderQuestion[2]}>3. {decode(Questions[2].question)}</li>
          <div class="button-div">
            <button hidden={!renderQuestion[2]} onClick={handleClickCorrect}disabled={buttonDisable[3]} style = {{backgroundColor: buttonDisable[3] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[2].correct_answer)}</button>
            <button hidden={!renderQuestion[2]} onClick={handleClick}disabled={buttonDisable[3]} style = {{backgroundColor: buttonDisable[3] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[2].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[2]} onClick={handleClick}disabled={buttonDisable[3]} style = {{backgroundColor: buttonDisable[3] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[2].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[2]} onClick={handleClick}disabled={buttonDisable[3]} style = {{backgroundColor: buttonDisable[3] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[2].incorrect_answers[2])}</button>

          </div>
          <li hidden={!renderQuestion[3]}>4. {decode(Questions[3].question)}</li>
          <div class="button-div">

            <button hidden={!renderQuestion[3]} onClick={handleClick}disabled={buttonDisable[4]} style = {{backgroundColor: buttonDisable[4] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[3].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[3]} onClick={handleClick} disabled={buttonDisable[4]} style = {{backgroundColor: buttonDisable[4] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[3].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[3]} onClick={handleClick} disabled={buttonDisable[4]} style = {{backgroundColor: buttonDisable[4] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[3].incorrect_answers[2])}</button>
            <button hidden={!renderQuestion[3]} onClick={handleClickCorrect} disabled={buttonDisable[4]} style = {{backgroundColor: buttonDisable[4] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[3].correct_answer)}</button>
          </div>
          <li hidden={!renderQuestion[4]}>5. {decode(Questions[4].question)}</li>
          <div class="button-div">

            <button hidden={!renderQuestion[4]} onClick={handleClick}disabled={buttonDisable[5]} style = {{backgroundColor: buttonDisable[5] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[4].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[4]} onClick={handleClick}disabled={buttonDisable[5]} style = {{backgroundColor: buttonDisable[5] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[4].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[4]} onClick={handleClickCorrect}disabled={buttonDisable[5]} style = {{backgroundColor: buttonDisable[5] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[4].correct_answer)}</button>
            <button hidden={!renderQuestion[4]} onClick={handleClick}disabled={buttonDisable[5]} style = {{backgroundColor: buttonDisable[5] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[4].incorrect_answers[2])}</button>
          </div>
          <li hidden={!renderQuestion[5]}>6. {decode(Questions[5].question)}</li>
          <div class="button-div">

            <button hidden={!renderQuestion[5]} onClick={handleClick}disabled={buttonDisable[6]} style = {{backgroundColor: buttonDisable[6] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[5].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[5]} onClick={handleClickCorrect}disabled={buttonDisable[6]} style = {{backgroundColor: buttonDisable[6] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[5].correct_answer)}</button>
            <button hidden={!renderQuestion[5]} onClick={handleClick}disabled={buttonDisable[6]} style = {{backgroundColor: buttonDisable[6] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[5].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[5]} onClick={handleClick}disabled={buttonDisable[6]} style = {{backgroundColor: buttonDisable[6] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[5].incorrect_answers[2])}</button>
          </div>
          <li hidden={!renderQuestion[6]}>7. {decode(Questions[6].question)}</li>
          <div class="button-div">

            <button hidden={!renderQuestion[6]} onClick={handleClick} disabled={buttonDisable[7]} style = {{backgroundColor: buttonDisable[7] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[6].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[6]} onClick={handleClick} disabled={buttonDisable[7]} style = {{backgroundColor: buttonDisable[7] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[6].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[6]} onClick={handleClick} disabled={buttonDisable[7]} style = {{backgroundColor: buttonDisable[7] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[6].incorrect_answers[2])}</button>
            <button hidden={!renderQuestion[6]} onClick={handleClickCorrect} disabled={buttonDisable[7]} style = {{backgroundColor: buttonDisable[7] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[6].correct_answer)}</button>
          </div>
          <li hidden={!renderQuestion[7]}>8. {decode(Questions[7].question)}</li>
          <div class="button-div">
            <button hidden={!renderQuestion[7]} onClick={handleClickCorrect} disabled={buttonDisable[8]} style = {{backgroundColor: buttonDisable[8] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[7].correct_answer)}</button>
            <button hidden={!renderQuestion[7]} onClick={handleClick} disabled={buttonDisable[8]} style = {{backgroundColor: buttonDisable[8] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[7].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[7]} onClick={handleClick} disabled={buttonDisable[8]} style = {{backgroundColor: buttonDisable[8] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[7].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[7]} onClick={handleClick} disabled={buttonDisable[8]} style = {{backgroundColor: buttonDisable[8] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[7].incorrect_answers[2])}</button>

          </div>
          <li hidden={!renderQuestion[8]}>9. {decode(Questions[8].question)}</li>
          <div class="button-div">

            <button hidden={!renderQuestion[8]} onClick={handleClick} disabled={buttonDisable[9]} style = {{backgroundColor: buttonDisable[9] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[8].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[8]} onClick={handleClick} disabled={buttonDisable[9]} style = {{backgroundColor: buttonDisable[9] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[8].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[8]} onClick={handleClickCorrect} disabled={buttonDisable[9]} style = {{backgroundColor: buttonDisable[9] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[8].correct_answer)}</button>
            <button hidden={!renderQuestion[8]} onClick={handleClick} disabled={buttonDisable[9]} style = {{backgroundColor: buttonDisable[9] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[8].incorrect_answers[2])}</button>
          </div>
          <li hidden={!renderQuestion[9]}>10. {decode(Questions[9].question)}</li>
          <div class="button-div">

            <button hidden={!renderQuestion[9]} onClick={handleClick} disabled={buttonDisable[10]} style = {{backgroundColor: buttonDisable[10] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[9].incorrect_answers[0])}</button>
            <button hidden={!renderQuestion[9]} onClick={handleClick} disabled={buttonDisable[10]} style = {{backgroundColor: buttonDisable[10] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[9].incorrect_answers[1])}</button>
            <button hidden={!renderQuestion[9]} onClick={handleClickCorrect} disabled={buttonDisable[10]} style = {{backgroundColor: buttonDisable[10] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[9].correct_answer)}</button>
            <button hidden={!renderQuestion[9]} onClick={handleClick} disabled={buttonDisable[10]} style = {{backgroundColor: buttonDisable[10] ? '#778899' :'var(--bgBlue)' }}>{decode(Questions[9].incorrect_answers[2])}</button>
          </div>
          


          <div id='qanswers'>
          {
            answers.map((ans, i) => {
              return <button key={i}>{ans}</button>
            })
          }
        </div>
        </ul>
      </div>
        
           


      </div>}
    </div>
  )
}

export default Room;
