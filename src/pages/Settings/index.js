import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem';


// import { Link } from '@mui/material';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


import { Categories } from '../../data'
import { loadCategory, loadDifficulty, loadType } from '../../actions'
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
  }

  console.log('in settings', {category},{difficulty},{type})
  const dispatch = useDispatch()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('i am submitted')
    dispatch(loadCategory(category));
    dispatch(loadDifficulty(difficulty));
    dispatch(loadType(type))
  }



  return (

    <div className='settings'>
      <h1>Questions</h1>

      <form onSubmit={handleFormSubmit}>
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

        <CssTextField
          id="categories"
          select
          label="Select a category"
          margin="normal"
          value={category}
          onChange={(e) => setCat(e.target.value)}
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
          onChange={(e) => setDiff(e.target.value)}
        >
          <MenuItem id='easy' key='Easy' value='easy'>Easy</MenuItem>
          <MenuItem key='Medium' value='medium'>Medium</MenuItem>
          <MenuItem key='Hard' value='hard'>Hard</MenuItem>
        </CssTextField>

        <CssTextField
          id="qtype"
          select
          label="Select a type"
          margin="normal"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem key='Multiple Choice' value='multipleChoice'>Muiltple Choice</MenuItem>
          <MenuItem key='TrueFalse' value='trueFalse'>True/False</MenuItem>
          <MenuItem key='Combonation' value='combination'>Combination</MenuItem>
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
        <Link to='/Room'><button onClick={createRoom} >Create A Room &#8594;</button></Link>

      </form>
     
    </div>
  )
}; 
export default Settings
