import React from 'react';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {

  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}>Back Button</button>
  )
}

export default BackButton
