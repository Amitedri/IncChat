import React, { useEffect, useRef, useState } from 'react';
import './ChatRoom.css';
import socketio from 'socket.io-client';
import Users from '../Users/Users';
let io;
let usersArray;
const ChatRoom = (props) => {
    const endPoint = 'http://127.0.0.1:5000/';
    const [isSocketOpen, setIsSocketOpen] = useState(false);
    const [username, setUsername] = useState(
        window.localStorage.getItem('username')
    );
    const [room, setRoom] = useState(window.localStorage.getItem('room'));

    //
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //
    const [Indicate, setIndicate] = useState(false);
    const [users, setUsers] = useState({});
    const inputRef = useRef(null);

    const generateMessage = (text) => {
        return {
            username,
            room,
            message: text,
            id: Date.now(),
        };
    };
    const userObj = () => {
        return {
            username,
            room,
            id: io.id,
        };
    };
    const initSocket = () => {
        io = socketio.connect(endPoint);

        io.on('newLogin', () => {
            io.emit('getUserData', userObj());
            setIsSocketOpen(true);
        });

        io.on('updateUserList', (usersList) => {
            return setUsers((prevState) => usersList);
        });

        io.on('ping', () => {
            io.emit('pang')
        });
        
        return () => {
            io.emit('disconnect');
            io.off();
            setIsSocketOpen(false);
        };
    };

    const handleServerMessages = () => {
        io.on('newUserAnnounce', (value) => {
            return setMessages((prevState) => [...prevState, value]);
        });

        io.on('messageInRoom', (value) => {
            return setMessages((prevState) => [...prevState, value]);
        });
    };

    //init socket.io
    useEffect(initSocket, [window.location]);

    //handle incoming messages
    useEffect(handleServerMessages, [window.location]);

    const handleMessageSend = () => {
        console.log(users);
        io.emit('newMessage', generateMessage(message));
        inputRef.current.value = '';
    };

    const mapMessages = (messages) => {
        return messages.map((message) => {
            return (
                <div key={message.id} className="messageWrapper">
                    <span className="sender">{message.username + ': '}</span>
                    <span className="content">{message.message}</span>
                </div>
            );
        });
    };

    return (
        <div className="layoutContainer">
            <Users users={users} />
            <div className="chatContainer">
                <div className="chatWindow">{mapMessages(messages)}</div>
            </div>
            <div className="controls">
                <input
                    ref={inputRef}
                    onInput={(event) => setMessage(event.target.value)}
                    placeholder="type something..."
                />
                <button onClick={handleMessageSend}>Send</button>
            </div>
        </div>
    );
};
export default ChatRoom;
