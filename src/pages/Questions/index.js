import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { fetchQuestions } from '../../actions';

const Questions = () => {
  // const category = useSelector(state => state.category)
  // const difficulty = useSelector(state => state.difficulty)
  const questions = useSelector(state => state.questions)
  const questionidx = useSelector(state =>state.qidx)

  
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

