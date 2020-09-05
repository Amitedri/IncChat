import React, { useEffect, useState } from 'react';
import './ChatRoom.css';
import * as Components from './components';
import socketio from 'socket.io-client';
import { set } from 'mongoose';

// import userImage from '../../assets/user.jpg'

const ChatRoom = ({ location }) => {
    const userInput = {
        username: window.localStorage.getItem('userName'),
        room: window.localStorage.getItem('room'),
    };
    //
    //Chat data
    var __temp_message = [];
    const [username, setUsername] = useState(userInput.username);
    const [room, setRoom] = useState(userInput.room);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userType, setUserType] = useState('');
    const [users, setUsers] = useState([]);
    const endPoint = 'http://127.0.0.1:5000/';
    const io = socketio.connect(endPoint);
    useEffect(() => {
        //clear local storage
        window.localStorage.clear();
        //joinin room and announcing it back from the server to the sockets connected to that room
        io.emit('join', { username, room });
        //Sends welcome string to selected room
        io.on('greetNewUser', ({ username, message }) => {
            return setMessages((messages) => [
                ...messages,
                { username, message },
            ]);
        });
        //updates connected sockets list

        io.on('updateConnectedUsers', (users,callback) => {
            console.log(callback())
             setUsers([...users]);
        });
        console.log(io.connected);
        return () => {
            io.emit('disconnect', { username, room });
            io.disconnect();
            io.off();
        };
    }, [endPoint, location.search]);

    io.on('disMessage', ({ username, message }) => {
        return setMessages((messages) => [...messages, { username, message }]);
    });

    const handleNewMessage = () => {
        return io.emit('message', { username, room, message });
    };
    //close socket on browser close
    window.onbeforeunload = function () {
        io.emit('disconnect', { username });
        return io.off();
    };

    return (
        <div className="layoutContainer">
            <div className="usersContainerWrap">
                <p>chats</p>
                <div className="usersOutsideContainer">
                    <div className="quickContactContainer">
                        <div className="miniContact" />
                    </div>
                    <div className="usersInnerContainer">
                        {users.map((user) => {
                            return <div>{user.username}</div>;
                        })}
                    </div>
                </div>
            </div>
            <div className="chatContainer">
                <div className="chatWindow">
                    {messages.map((message, index) => {
                        return (
                            <div key={index} className="messageContainer">
                                <div className="chatMessageSender">
                                    <p>{message.username}</p>
                                </div>
                                <div className="messageContent">
                                    {message.message}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="controls">
                <input
                    onInput={(event) => setMessage(event.target.value)}
                    placeholder="type something..."
                />
                <button onClick={handleNewMessage}>Send</button>
            </div>
        </div>
    );
};
export default ChatRoom;
