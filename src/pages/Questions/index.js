import  { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { fetchQuestions } from '../../actions';



const Questions = () => {
    const category = useSelector(state => state.category)
    const difficulty = useSelector(state => state.difficulty)
    const type = useSelector(state => state.type)

  useEffect ( () => {
    fetchQuestions(category,difficulty,type)
  })
    
  return (
    <>
    <h2>category: {category} difficulty: {difficulty}</h2> 
    <h1></h1>
    <button></button>
    <button></button>
    <button></button>
    <button></button>
    </>
  )
};

export default Questions

