import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { fetchQuestions } from '../../actions';

const Questions = () => {
  const category = useSelector(state => state.category)
  const difficulty = useSelector(state => state.difficulty)
  const questions = useSelector(state => state.type)
  const questionidx = useSelector(state =>state.qidx)

  const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`

  const dispatch = useDispatch()
  const setQuestions = q => {
    dispatch ({
      type:'SET_QUESTIONS',
      payload:q
    })
    
  }
  
  useEffect(() => {
    const results = fetchQuestions(url)
    console.log('results',results)
    setQuestions(results)

  }, [])


  return (
    <>
      <h2>question {questionidx + 1} </h2>
      

    </>
  )
};

export default Questions

