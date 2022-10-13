import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { fetchQuestions } from '../../actions';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');


const Questions = () => {
  const questions = useSelector(state => state.questions)
  const questionidx = useSelector(state =>state.qidx)
  // const questions = fetchQuestions({category: category}, {difficulty: difficulty}, {type: type})
  // console.log('questions', questions)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    

    socket.emit('start', 'we done it')
    
  }, [])
  useEffect(() => {
    // stop =setInterval(() => {
    //   setSeconds(seconds => seconds + 1);
    // }, 1000);

  }, [seconds])


  console.log('questions', questions)
 
 
  return (
    <>
      <h2>question {questionidx + 1} </h2>
      <h3>{questions[questionidx].question}</h3>
      <ul>
        {/* {questions[0]} */}
      </ul>
    </>
  )
};

export default Questions

