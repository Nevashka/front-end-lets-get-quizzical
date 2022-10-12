import  { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { fetchQuestions } from '../../actions';



const Questions = () => {
    const category = useSelector(state => state.category)
    const difficulty = useSelector(state => state.difficulty)
    const type = useSelector(state => state.type)
   
    console.log('in questoins',{category},{difficulty},{type})

  useEffect ( () => {
    const questions = fetchQuestions(category,difficulty,type)
    console.log('questions', {questions})
  })
    
  
  return (
    <>
    <h3>questions appear here!</h3>
    </>
  )
};

export default Questions

