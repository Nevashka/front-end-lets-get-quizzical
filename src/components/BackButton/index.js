import React from 'react';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {

  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}> back &#11013;</button>
  )
}

export default BackButton
