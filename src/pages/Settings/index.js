import React, { useState } from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem';
// import { Link } from '@mui/material';
import { Categories } from '../../data'
import './style.css'
import { BackButton } from '../../components';

const socket = io('http://localhost:5001');

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'var(--green)',
  },
  input: {
    color: 'white'
  },
  label: {
    color: 'white',
  },

  '& .MuiInput-underline:after': {
    borderBottomColor: 'var(--green)',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: '#f38516',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--green)',
    },
  },
});

const Settings = () => {
  const [category, setCat] = useState('')
  const [loading,setLoading] = useState(false)
  const [difficulty, setDiff] = useState('')
  const [roomName, setRoomName] = useState('')
  const questions = useSelector(state => state.questions)

  const createRoom = () => {
   
  }

  console.log('in settings', { category }, { difficulty })

  const dispatch = useDispatch()

  const handleCategory = event => {
    setCat(event.target.value)
  }

  const handleDifficulty = event => {
    setDiff(event.target.value)
  }

  const setQuestions = (results) => {
    return ({
      type:'SET_QUESTIONS',
      payload: results
    })
    
  }

  const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`

  const fetchQuestions = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(setQuestions(data.results))
      console.log('in room', data.results)
      data.results.length > 1 ? setLoading(false) : setLoading(true)
      
      
    })
  }

  function onClickFunctions() {
    fetchQuestions();
    loading ? console.log('i am loading the questions, wait pls'): createRoom() 

    
    socket.emit('share questions', questions)
  
  
    
  }

  return (
    
    <>
    <div className='settings'>
      <h2>Question settings</h2>

      <form >

        <CssTextField
          id="categories"
          select
          label="Select a category"
          margin="normal"
          value={category}
          onChange={handleCategory}
        >
          {Categories.map((cat) => (
            <MenuItem key={cat.category} value={cat.value}>
              {cat.category}
            </MenuItem>
          ))}
        </CssTextField>

        <CssTextField
          id="difficulties"
          select
          label="Select a difficulty"
          margin="normal"
          value={difficulty}
          onChange={handleDifficulty}
        >
          <MenuItem id='easy' key='Easy' value='easy'>Easy</MenuItem>
          <MenuItem key='Medium' value='medium'>Medium</MenuItem>
          <MenuItem key='Hard' value='hard'>Hard</MenuItem>
        </CssTextField>

        <CssTextField
          id="roomName"
          label="Room Name"
          onChange={(e) => setRoomName(e.target.value)}
          variant="standard"
          margin="normal">
        </CssTextField>
        <button onClick={onClickFunctions} ><Link to='/Room'>Create A Room &#8594;</Link></button>

      </form>

    </div>
    <div className='back'> <BackButton/></div>
    
  
   </>
  )
};
export default Settings
