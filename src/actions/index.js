import axios from 'axios';

  // const loadCategory = cat => { dispatch ({ type: 'LOAD_CATEGORY', payload: cat}) }
  // const loadDifficulty = difficulty => { dispatch ({ type: 'LOAD_DIFFICULTY', payload: difficulty }) }
  // const loadType = type => { dispatch ({ type: 'LOAD_TYPE', payload: type }) };
  


 export const fetchQuestions = async ({category: category}, {difficulty: difficulty}, {type: type}) => {
  try {
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
    return data
    console.log('getting data',data)
  } catch (err) {
    throw new Error(err.message)
  }

}

