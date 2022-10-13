import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { decode } from "html-entities";

import io from 'socket.io-client';

const socket = io('http://localhost:5001');


const Questions = () => {
  const [answers, setAnswers] = useState([])
  const [index, setIndex] = useState('loading questions...')
  const [Questions, setQuestions] = useState([])
  const questions = useSelector(state => state.questions)
  const questionidx = useSelector(state => state.qidx)

  const [renderQuestion, setRenderQuestion] = useState([false, false, false, false, false, false, false, false, false, false])

  useEffect(() => {
    

    socket.on('load question', index => {
      setRenderQuestion((prev) => {
        prev[index] = !prev[index]
        return[...prev]
      })
      getAnswers(index)
      setIndex(`Question: ${index + 1}`)
    })

    socket.emit('start', 'we done it')
    socket.on('send questions', (data) => {
      setQuestions(data)
      // console.log(data)
    })
    
    
  }, [])
  

 
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

 
  console.log(answers)






    return (
      <div>
        <h2> {index} </h2>
        {/* <h3>{decode(questions[questionidx].question)}</h3> */}

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



    )
  };

  export default Questions

