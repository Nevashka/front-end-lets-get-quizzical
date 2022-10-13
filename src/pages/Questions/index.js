import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { decode } from "html-entities";

import io from 'socket.io-client';

const socket = io('http://localhost:5001');


const Questions = () => {
  const [answers, setAnswers] = useState([])
  const questions = useSelector(state => state.questions)
  const questionidx = useSelector(state => state.qidx)

 
  // const questions = useSelector(state => state.questions)
  // const questionidx = useSelector(state =>state.qidx)
  // const questions = fetchQuestions({category: category}, {difficulty: difficulty}, {type: type})
  // console.log('questions', questions)
  const [numQ, setnumQ] = useState(1)
  const[Questions, setQuestions] = useState([])
  console.log(questionidx)
  console.log('this is Questions',Questions)
  console.log('this is questions',questions)
  console.log('this is answers',answers)


  const [renderQuestion, setRenderQuestion] = useState([false,false,false,false,false,false,false,false,false,false])

  

  useEffect(() => {
    
    socket.emit('start', 'we done it')
    socket.on('send questions', (data) => {
      setQuestions(data)
      console.log(data)
    })
    

  }, [])

  useEffect(() => {

    socket.on('load question', index => {
      console.log('this is the index', index)
      console.log('loading next question')
      setRenderQuestion((prev) => {
        prev[index] = true
        return[...prev]
      })
      console.log('this is render',renderQuestion)
      console.log('function 2')
      let options = []
      let incorrect = decode(Questions[index].incorrect_answers)
      let correct = decode(Questions[index].correct_answer)
      incorrect.map(ans => options.push(ans))
      options.push(correct)
      
      
      setAnswers(options.sort(() => Math.random() - 0.5))
      setnumQ(index+1)
    })
  },[renderQuestion, Questions])

  // if(Questions){
  //   console.log('getting answers')
  //   const getAnswers = (index) => {
  //     console.log('function one')
  //     let options = []
  //     let incorrect = decode(Questions[index].incorrect_answers)
  //     let correct = decode(Questions[index].correct_answer)
      
  //     const incorrectOptions = incorrect.map(ans => options.push(ans))
  //     const correctOptions = options.push(correct)
      
  //     setAnswers(options.sort(() => Math.random() - 0.5))
  //   };
  // }


  return (
    <div id='ans'>

      <h2>question {numQ} </h2>
      {/* <h3>{decode(Questions[questionidx].question)}</h3> */}

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

