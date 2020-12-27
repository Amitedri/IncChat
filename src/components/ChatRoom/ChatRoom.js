import React, { useEffect, useRef, useState } from 'react';
import send from '../../assets/send.png';

import './ChatRoom.css';
import socketio from 'socket.io-client';
import Users from '../Users/Users';
import { userObj, handleNewMessage, handleUsersUpdate, mapMessages, sendMessage } from './chatUtils';
const encrypt = require('socket.io-encrypt');
let io;

const ChatRoom = (props) => {
    //A little workaround to prevent from socket to reconnect on every refresh.
    //better implemnation is on progress
    const ENDPOINT = 'http://127.0.0.1:5000/';
    const [username, setUsername] = useState(window.localStorage.getItem('username'));
    const [room, setRoom] = useState(window.localStorage.getItem('room'));
    const [secret, setSecret] = useState(window.localStorage.getItem('secret'));
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [color, setColor] = useState('');


    const initSocket = async () => {
        //this will prevent from the browser from creating extra sockets on every refresh
        io = socketio(ENDPOINT, { transports: ['websocket'], upgrade: false });
        io.on('newLogin', () => {
            io.emit('getUserData', userObj(username, room, io.id));
            let colors = ['blue', 'red', 'yellow', 'green', 'lightblue'];
            let randomColor = () => Math.floor(Math.random() * 5 - 1);
            return setColor(colors[randomColor()]);
        });

        io.on('messageFromServer', (message) => {
            console.log(message);
            handleNewMessage(setMessages, message);
        });

        io.on('usersListUpdate', (usersList) => {
            console.log(usersList);
            handleUsersUpdate(setUsers, usersList);
        });

        io.on('userOut', () => {
            io.emit('requestUsersUpdate', userObj(username, room, io.id,secret));
        });

        return () => {
            io.emit('disconnect');
            io.off();
        };
    };

    const sendMessage = (message, username, io) => {
        const messageObj = {
            message,
            sender: 'self',
            username,
            room,
        };
        console.log(process.env.PORT)
        io.emit('message', messageObj);
    };
    //init socket and add event listeners once page content is fully loaded
    useEffect(initSocket, []);
    return (
        <div className="chatContainer">
            <div className="chatScreen">{mapMessages(messages, username)}</div>
            <div className="chatUsersContainer">
                <Users usersList={users} color={color} />
            </div>

            <div className="chatControls">
                <div className="keyboard">
                    <input onInput={(event) => setMessage(event.target.value)} type="text" placeholder="               type something.." />
                </div>
                <div className="chatButton" onClick={() => sendMessage(message, username, io)}>
                    <img src={send} />
                </div>
            </div>
        </div>
    );
};
export default ChatRoom;
