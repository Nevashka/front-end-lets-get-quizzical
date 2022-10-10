import React from 'react'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import {styled} from '@mui/material/styles'

import './style.css'

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#5bba6f',
    },
    input : {
        color:'white'
    },
    label: {
        color: 'white',
      },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#5bba6f',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: 'white',
      },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: '#01c9df',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#5bba6f',
      },
    },
  });
const Settings = () => {
    // change text content on button hover
    return (
        <>
            <h1>Questions</h1>
           
            <form>
                <CssTextField
                    id="username"
                    label="Username"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    margin="normal"
                />

                <CssTextField
                    id="categories"
                    color="secondary"
                    select
                    label="Select a category"
                    value='name'
                    margin= 'normal'
                    size='large'

                ></CssTextField>

                <CssTextField
                    id="difficulties"
                    color="secondary"
                    select
                    label="Select a difficulty"
                    value='difficulty'
                    margin="normal"

                ></CssTextField>

                <CssTextField
                    id="qtype"
                    color="secondary"
                    select
                    label="Select a type"
                    value='type'
                    margin="normal"
                ></CssTextField>

                <button>Start &#8594;</button>
            </form>
        </>
    )
};
export default Settings
