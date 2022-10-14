// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5001');
// const Socket = () => {
//     const [isConnected, setIsConnected] = useState(socket.connected);
//     const [lastPong, setLastPong] = useState(null);
//     const [roomName, setRoomName] = useState(null);
//     const [numPlayers, setNumPlayers] = useState(0)
    

//     useEffect(() => {
//         socket.on('connect', () => {
//             setIsConnected(true);
//         });

//         socket.on('admin-message', msg => console.log(msg))
//         socket.on('create error', msg => console.log(msg))
//         socket.on('join error', msg => console.log(msg))
//         socket.on('ready message', msg => console.log(msg))

//         socket.on('room size', data => {
//             setNumPlayers(data)
//         } )

//         socket.on('disconnect', () => {
//             setIsConnected(false);
//         });

//         socket.on('pong', () => {
//             setLastPong('hello there');
//         });

       

//         return () => {
//             socket.off('connect');
//             socket.off('disconnect');
//             socket.off('pong');
//         };
//     }, []);

//     const handleChange = (e) => {
//         setRoomName(e.target.value)
        
//     }

//     const sendPing = () => {
//         socket.emit('ping', 'heyyyy');
//     }

//     const joinRoom = () => {
//         socket.emit('join room', {room:roomName})
//     }
//     const createRoom = () => {
        
//         socket.emit('create room', {room:roomName})
        
        
//     }

    
//     const BeginGame = () => {
//         socket.emit('player ready', {room: roomName, player:'player 1'})
//     }

//     return (
//         <div>
//             <p>Connected: {'' + isConnected}</p>
//             <p>Last pong: {lastPong || '-'}</p>
//             <p>Number of players: {numPlayers}</p>
//             <button onClick={sendPing}>Send ping</button>
//             <button onClick={joinRoom}>Join Room</button>
//             <button onClick={createRoom}>Create Room</button>
//             <input type="text" onChange={handleChange} style={{backgroundColor:'white', color:'black'}}></input>
//             <button onClick={BeginGame}>Begin game</button>
            
            
            
//         </div>
//     )
// };

// export default Socket
