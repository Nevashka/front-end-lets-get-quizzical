import axios from 'axios';

const loadCategory = (category) => { return { type: 'LOAD_CATEGORY', payload: category }}
const loadDifficulty = (difficulty) => { return { type: 'LOAD_DIFFICULTY', payload: difficulty }}
const loadType = (type) => { return { type: 'LOAD_TYPE', payload: type}};

const loadQuestions = ({ questions: { questionsArray } }) => {
  return {
    type: 'LOAD_QUESTIONS',
    payload: { questionsArray }
  }
}


export const getQuestions = (category, difficulty, type) => {

  return async dispatch => {
    dispatch(loadCategory(category));
    dispatch(loadDifficulty(difficulty));
    dispatch(loadType(type))
    
    try {
        const questions = await fetchQuestions (category, difficulty, type)
        dispatch(loadQuestions(questions)) //questions will pass here
    } catch (err) {
        console.warn(err.message);
        dispatch({type: 'SET_ERROR', payload: err.message})
    }
  }
}

//we can create an object with category, difficulty and type and pass it to a single reducer and then use to fetch?


  const fetchQuestions = async (category,difficulty,type) => {
      try {
          const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
          return data.results
      } catch (err) {
          throw new Error(err.message)
      }
          
  }
  
