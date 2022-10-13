import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { fetchQuestions } from '../../actions';
import { decode } from "html-entities";


import io from 'socket.io-client';

const socket = io('http://localhost:5001');


const Questions = () => {
  // const questions = useSelector(state => state.questions)
  // const questionidx = useSelector(state =>state.qidx)
  // const questions = fetchQuestions({category: category}, {difficulty: difficulty}, {type: type})
  // console.log('questions', questions)
  const [seconds, setSeconds] = useState(0)
  const[Questions, setQuestions] = useState([])


  const [renderQuestion, setRenderQuestion] = useState([false,false,false,false,false,false,false,false,false,false])

  

  useEffect(() => {
    
    socket.on('load question', index => {
      setRenderQuestion((prev) => {
        prev[index] = !prev[index]
        return[...prev]
      })
    })
    socket.emit('start', 'we done it')
    socket.on('send questions', (data) => {
      setQuestions(data)
      console.log(data)
    })
    
  }, [])
  useEffect(() => {
    // stop =setInterval(() => {
    //   setSeconds(seconds => seconds + 1);
    // }, 1000);

  }, [seconds])


  // console.log('questions', questions)
 
 
  return (
    <>

      {/* <h2>question {questionidx + 1} </h2>
      <h3>{questions[questionidx].question}</h3> */}

      <ul>
        <li hidden={!renderQuestion[0]}>Question 1</li>
        <li hidden={!renderQuestion[1]}>Question 2</li>
        <li hidden={!renderQuestion[2]}>Question 3</li>
        <li hidden={!renderQuestion[3]}>Question 4</li>
        <li hidden={!renderQuestion[4]}>Question 5</li>
        <li hidden={!renderQuestion[5]}>Question 6</li>
        <li hidden={!renderQuestion[6]}>Question 7</li>
        <li hidden={!renderQuestion[7]}>Question 8</li>
        <li hidden={!renderQuestion[8]}>Question 9</li>
        <li hidden={!renderQuestion[9]}>Question 10</li>
       
        
      </ul>
    </>
  )
};

export default Questions

