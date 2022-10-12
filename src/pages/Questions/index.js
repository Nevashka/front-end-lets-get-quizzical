import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { fetchQuestions } from '../../actions';
import axios from 'axios';



const Questions = () => {
  const category = useSelector(state => state.category)
  const difficulty = useSelector(state => state.difficulty)
  const type = useSelector(state => state.type)


  console.log('in questions', category, difficulty, type)

  // const params = [category, difficulty, type]
  // const questions = fetchQuestions({category: category}, {difficulty: difficulty}, {type: type})
  // console.log('questions', questions)

  useEffect(() => {
    const fetchQuestions = async (category, difficulty, type) => {
      console.log('inside function', category, difficulty, type)

      const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`
      try {
        const { data } = await axios.get(url)
        console.log('api data:', data)
        return data.results
      } catch (err) {
        throw new Error(err.message)
      }

    }
    
    fetchQuestions(category, difficulty, type)

  }, [])



  return (
    <>
      <h3>questions appear here!</h3>

    </>
  )
};

export default Questions

