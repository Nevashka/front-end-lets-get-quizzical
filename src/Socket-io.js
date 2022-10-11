import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Socket = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
            // socket.emit() => send any EVENT to server
        });
        // If answer correct => socket.emit(score = score +1)
        // we can use socket for waiting room and for dynamic scores
        // display message
        // socket.emit('join-room', room) room you want to join
        //user type name of room so users with the same room name are connected
        
        socket.on('admin-message', msg => console.log(msg))

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', () => {
            setLastPong(new Date().toISOString());
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const sendPing = () => {
        socket.emit('ping');
    }

    return (
        <div>
            <p>Connected: {'' + isConnected}</p>
            <p>Last pong: {lastPong || '-'}</p>
            <button onClick={sendPing}>Send ping</button>
        </div>
    )
};

export default Socket