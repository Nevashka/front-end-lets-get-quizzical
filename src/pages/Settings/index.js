import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem';


import io from 'socket.io-client'
// import { Link } from '@mui/material';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


import { Categories } from '../../data'
import { sendData } from '../../actions'
import './style.css'

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
  const [difficulty, setDiff] = useState('')
  const [type, setType] = useState('')
  const [roomName, setRoomName] = useState(null)

  const createRoom = () => {
    socket.emit('create room', { room: roomName })
    console.log('creating room')
  }

  console.log('in settings', { category }, { difficulty }, { type })

  const dispatch = useDispatch()

  const handleCategory = event => {
    setCat(event.target.value)
    dispatch({
      type: 'LOAD_CATEGORY',
      payload: event.target.value
    })
  }

  const handleDifficulty = event => {
    setDiff(event.target.value)
    dispatch({
      type: 'LOAD_DIFFICULTY',
      payload: event.target.value
    })
  }

  const setQuestions = (results) => {
    return ({
      type:'SET_QUESTIONS',
      payload: results
    })
    
  }

  const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`

  const fetchQuestions = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(setQuestions(data.results))
      console.log('in room', data.results)
    })
  }

  function onClickFunctions() {
    fetchQuestions();
    createRoom()
  }

  return (

    <div className='settings'>
      <h1>Questions</h1>

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* <AccountCircle /> */}
              </InputAdornment>
            ),
          }}
          variant="standard"
          margin="normal">
        </CssTextField>
        <Link to='/Room'><button onClick={onClickFunctions} >Create A Room &#8594;</button></Link>

      </form>

    </div>
  )
};
export default Settings

// {/* <CssTextField
//           id="qtype"
//           select
//           label="Select a type"
//           margin="normal"
//           value={type}
//           onChange={handleType}
//         >
//           <MenuItem key='Multiple' value='multiple'>Multiple Choice</MenuItem>
//           <MenuItem key='TrueFalse' value='boolean'>True/False</MenuItem>
//           <MenuItem key='Combonation' value=''>Combination</MenuItem>
//         </CssTextField>
//          */}

  // const handleType = event => {
  //   setType(event.target.value)
  //   dispatch({
  //     type: 'LOAD_TYPE',
  //     payload: event.target.value
  //   })
  // }

  // const dispatch = useDispatch()

  {/* <CssTextField
          id="username"
          label="Username"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={(e) => setUsername(e.target.value)}
        /> */}
