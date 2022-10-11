//socket between room and server?
//Game is called here?
//create a user socket in the server and in the client
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001/Room');




const Room = () => {

  const [roomName, setRoomName] = useState(null);
  const [numPlayers, setNumPlayers] = useState(0)

  useEffect(() => {
    
   
    socket.on('join error', msg => console.log(msg))
    
    
    socket.on('room size', data => {
      console.log(data)
        setNumPlayers(data)
    } )

    
}, []);

  const handleChange = (e) => {
    setRoomName(e.target.value)
  }

  const joinRoom = () => {
    console.log('joining room:', roomName)
    socket.emit('join room', {room:roomName})
  }
  return (
    <>
      <div>Room</div>
      <div id="join button">
          <button onClick={joinRoom}>Join room</button>
          <input type="text" onChange={handleChange} style={{backgroundColor:'white', color:'black'}}></input>
          <br></br>
          <p>Players in the game:{numPlayers}</p>
      </div>
    </>

  )
}

export default Room
