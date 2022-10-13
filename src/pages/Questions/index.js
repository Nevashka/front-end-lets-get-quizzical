import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { decode } from "html-entities";

import io from 'socket.io-client';

const socket = io('http://localhost:5001');


const Questions = () => {
  const [answers, setAnswers] = useState([])
  const questions = useSelector(state => state.questions)
  const questionidx = useSelector(state => state.qidx)

  useEffect(() => {
    socket.emit('start', 'we done it')
    getAnswers()
  // const questions = useSelector(state => state.questions)
  // const questionidx = useSelector(state =>state.qidx)
  // const questions = fetchQuestions({category: category}, {difficulty: difficulty}, {type: type})
  // console.log('questions', questions)
  const [seconds, setSeconds] = useState(0)
  const[Questions, setQuestions] = useState([])


  const [renderQuestion, setRenderQuestion] = useState([false,false,false,false,false,false,false,false,false,false])

  

  useEffect(() => {
    
    socket.on('load question', index => {
      console.log('this is the index', index)
      console.log('loading next question')
      setRenderQuestion((prev) => {
        prev[index] = true
        return[...prev]
      })
      console.log('this is render',renderQuestion)
    })
    socket.emit('start', 'we done it')
    socket.on('send questions', (data) => {
      setQuestions(data)
      console.log(data)
    })
    

  }, [])



  const getAnswers = () => {
    let options = []
    let incorrect = decode(questions[questionidx].incorrect_answers)
    let correct = decode(questions[questionidx].correct_answer)

    const incorrectOptions = incorrect.map(ans => options.push(ans))
    const correctOptions = options.push(correct)

    setAnswers(options.sort(() => Math.random() - 0.5))
  };


  return (
    <div id='ans'>

      <h2>question {questionidx + 1} </h2>
      <h3>{decode(questions[questionidx].question)}</h3>

      <div >
          {
            answers.map((ans, i) => {
              return <button key={i}>{ans}</button>
            })
          }
        </div>
    </div>

  )
};

export default Questions

