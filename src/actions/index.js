import axios from 'axios';

export const loadCategory = (category) => { return { type: 'LOAD_CATEGORY', payload: category } }
export const loadDifficulty = (difficulty) => { return { type: 'LOAD_DIFFICULTY', payload: difficulty } }
export const loadType = (type) => { return { type: 'LOAD_TYPE', payload: type } };

export const fetchQuestions = async (category, difficulty, type) => {
  try {
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
    return data
    console.log(data)
  } catch (err) {
    throw new Error(err.message)
  }

}

