import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { fetchQuestions } from '../../actions';

const Questions = () => {
  // const category = useSelector(state => state.category)
  // const difficulty = useSelector(state => state.difficulty)
  const questions = useSelector(state => state.questions)
  const questionidx = useSelector(state =>state.qidx)

  // const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`

  // const dispatch = useDispatch()

  // const setQuestions = (results) => {
  //   return ({
  //     type:'SET_QUESTIONS',
  //     payload: results
  //   })
    
  // }
  // useEffect(() => {
  //   // const results = fetchQuestions(url)
  //   fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     dispatch(setQuestions(data.results))
  //   })
  // }, [])

  
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

