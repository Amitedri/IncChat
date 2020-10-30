import React, { useEffect, useRef, useState } from 'react';
import './ChatRoom.css';
import socketio from 'socket.io-client';
import Router from '../../';
// import userImage from '../../assets/user.jpg'
let io;

const ChatRoom = ({ location }) => {
    const [isSocketOpen, setIsSocketOpen] = useState(false);
    const endPoint = 'http://127.0.0.1:5000/';
    const [username, setUsername] = useState(
        window.localStorage.getItem('username')
    );
    const [room, setRoom] = useState(window.localStorage.getItem('room'));

    //
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //
    const inputRef = useRef(null);
    const userObj = () => {
        return {
            username,
            room,
            id: io.id,
        };
    };
    const generateMessage = (text) => {
        return {
            username,
            room,
            message: text,
            date: Date.now(),
        };
    };

    const initSocket = () => {
        console.log('we got connection');

        setIsSocketOpen(true);

        io = socketio.connect(endPoint);

        io.emit('newLogin', userObj());
        return () => {
            io.emit('disconnect');
            io.off();

            setIsSocketOpen(false);
        };
    };
    const handleServerMessages = () => {
        io.on('newUserAnnounce', (value) => {
            setMessages((prevState) => [value, ...prevState]);
        });

        io.on('messageInRoom', (value) => {
            console.log(value);
            setMessages((prevState) => [value, ...prevState]);
        });
    };
    //init socket.io
    useEffect(initSocket, [window.location]);

    //handle incoming messages
    useEffect(handleServerMessages, [window.location]);

    const handleMessageSend = () => {
        io.emit('newMessage', generateMessage(message));
        inputRef.current.value = '';
        console.log(messages);
    };

    const mapMessages = (messages) => {
        return messages.map((message) => {
            return (
                <div key={message.date} className="messageWrapper">
                    <span className="sender">{message.username}</span>
                    <span className="date">{message.date}</span>
                    <span className="content">{message.message}</span>
                </div>
            );
        });
    };
    return (
        <div className="layoutContainer">
            <div className="usersContainer">
                <p>chats</p>
                <div className="usersOutsideContainer">
                    <div className="quickContactContainer">
                        <div className="miniContact" />
                    </div>
                    <div className="usersInnerContainer"></div>
                </div>
            </div>
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
