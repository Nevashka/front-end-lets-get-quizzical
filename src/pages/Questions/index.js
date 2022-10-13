import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { fetchQuestions } from '../../actions';
import { decode } from "html-entities";

const Questions = () => {

  const questions = useSelector(state => state.questions)
  const questionidx = useSelector(state =>state.qidx)

  
  console.log('questions', questions)
 
 
  return (
    <>
      <h2>question {questionidx + 1} </h2>
      <h3>{decode(questions[questionidx].question)}</h3>
      <ul>
        {/* {questions[0]} */}
      </ul>

    </>
  )
};

export default Questions

