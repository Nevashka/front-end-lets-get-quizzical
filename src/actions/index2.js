
// const loadQuestions = ({ questions: { questionsArray } }) => {
//   return {
//     type: 'LOAD_QUESTIONS',
//     payload: { questionsArray }
//   }
// }

// const dispatch = useDispatch()
// export const passParams = (category, difficulty, type) => {
  
  
//   useDispatch(loadCategory(category));
//   useDispatch(loadDifficulty(difficulty));
//   useDispatch(loadType(type))
// }


// export const getQuestions = (category, difficulty, type) => {
//   return async dispatch => {
//     try {
//       const questions = await fetchQuestions(category, difficulty, type)
//       console.log(questions)
//       dispatch(loadQuestions(questions))
//     } catch (err) {
//       console.warn(err.message);
//       dispatch({ type: 'SET_ERROR', payload: err.message })
//     }
//   }
// }



//we can create an object with category, difficulty and type and pass it to a single reducer and then use to fetch?




