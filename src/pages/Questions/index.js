import React from 'react'
import axios from 'axios';


const Questions = () => {
    const fetchQuestions = async (category,difficulty,type) => {
        try {
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
            return data
        } catch (err) {
            throw new Error(err.message)
        }
            
    }
    
};

export default Questions


// const Questions = () => {
//     const fetchQuestions = async (category,difficulty,type) => {
//         try {
//             const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
//             return data
//         } catch (err) {
//             throw new Error(err.message)
//         }
            
//     }
    
// };
