import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { fetchQuestions } from '../../actions';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const Questions = () => {
  const category = useSelector(state => state.category)
  const difficulty = useSelector(state => state.difficulty)
  const type = useSelector(state => state.type)


  console.log('in questions', category, difficulty, type)
  

  // const params = [category, difficulty, type]
  // const questions = fetchQuestions({category: category}, {difficulty: difficulty}, {type: type})
  // console.log('questions', questions)
  const [questions, setQuestions] = useState([])
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const fetchQuestions = async (category, difficulty, type) => {
      console.log('inside function', category, difficulty, type)

      const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      console.log(url)
      try {
        const { data } = await axios.get(url)
        console.log('setting questions')
        setQuestions(data.results)
        setTimeout( () => {

          console.log(data)}, 60000)
        return data.results
      } catch (err) {
        throw new Error(err.message)
      }

    }
    
    fetchQuestions(category, difficulty, type)

    socket.emit('start', 'we done it')
    
  }, [])
  useEffect(() => {
    // stop =setInterval(() => {
    //   setSeconds(seconds => seconds + 1);
    // }, 1000);

  }, [seconds])
  const viewQuestions = () => {
    console.log(questions)
  }


  return (
    <>
      <h3>questions appear here!</h3>
      <button onClick={viewQuestions}>see questions</button>
      <p>{seconds}</p>

    </>
  )
};

export default Questions

