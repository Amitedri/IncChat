import React, { useEffect, useRef, useState } from 'react';
import send from '../../assets/send.png';
import julia from '../../assets/julia.svg';
import './ChatRoom.css';
import socketio from 'socket.io-client';
import Users from '../Users/Users';
import Colors from './Colors';
import menuBurger from '../../assets/menuBurger.svg';

import { userObj, handleNewMessage, handleUsersUpdate, mapMessages, sendMessage } from './chatUtils';
const encrypt = require('socket.io-encrypt');
let io;

const ChatRoom = (props) => {
    const ENDPOINT = 'http://127.0.0.1:5000/chat';
    const [username, setUsername] = useState(window.localStorage.getItem('username'));
    const [room, setRoom] = useState(window.localStorage.getItem('room'));
    const [secret, setSecret] = useState(window.localStorage.getItem('secret'));
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const initSocket = async () => {
        //this will prevent from the browser from creating extra sockets on every refresh
        io = socketio(ENDPOINT, { transports: ['websocket'], upgrade: false });

        io.on('newLogin', () => {
            io.emit('getUserData', userObj(username, room, io.id));
            return;
        });

        io.on('messageFromServer', (message) => {
            handleNewMessage(setMessages, message);
        });

        io.on('usersListUpdate', (usersList) => {
            handleUsersUpdate(setUsers, usersList);
        });

        io.on('userOut', () => {
            io.emit('requestUsersUpdate', userObj(username, room, io.id, secret));
        });

        return () => {
            io.emit('disconnect');
            io.off();
        };
    };
    const logout = () => {
        window.localStorage.clear();
        return (window.location = '/');
    };
    const MobileMenu = ({ Users, users, isOpen }) => {
        if (isOpen) {
            return (
                <div className="mobileMenu">
                    <Users usersList={users} />
                    <button className="exitButton" onClick={logout}>
                        Logout
                    </button>
                </div>
            );
        }
        return null;
    };
    //init socket and add event listeners once page content is fully loaded
    useEffect(initSocket, []);

    return (
        <div className="chatContainer">
            <MobileMenu Users={Users} users={users} isOpen={isOpen} />

            <div className="chatScreen">
                <div className="mobileMenuContainer">
                    <div className="mobileButton">
                        <img src={menuBurger} alt={menuBurger} onClick={() => setIsOpen((prevState) => !prevState)} />
                    </div>
                </div>
                {mapMessages(messages, username)}
            </div>
            <div className="chatUsersContainer">
                <Users usersList={users} />
            </div>

            <div className="chatControls">
                <div className="keyboard">
                    <input onInput={(event) => setMessage(event.target.value)} type="text" placeholder="               type something.." />
                </div>
                <div className="chatButton" onClick={() => sendMessage(message, username, io, room)}>
                    <img src={send} />
                </div>
            </div>
        </div>
    );
};
export default ChatRoom;
