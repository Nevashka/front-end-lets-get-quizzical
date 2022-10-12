import axios from 'axios';


export const fetchQuestions = async (path) => {
  try {
    const { data } = await axios.get(path)
    console.log('api data:', data.results)
    const answers = data.results
    return answers
  } catch (err) {
    throw new Error(err.message)
  }
}


