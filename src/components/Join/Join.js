import React, { useEffect, useRef, useState } from 'react';
import './Join.css';
// COMPONENTS
import Rooms from './Room';
import Secret from './Secret';

//METHODS
const { handleUserName, handleSubmit } = require('./JoinUtils');

const Join = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [switchOn, setSwitchOn] = useState(false);

    const getRoomState = (data) => {
        setRoom(() => data.room);
        setIsOpen(() => data.showComponent);
    };
    return (
        <div className="joinContainer">
            <div className="topContent">
                <div className="textHeader">Chatty</div>
                <div className="inputWrapper">
                    <input onInput={(event) => handleUserName(event, setUsername)} type="text" placeholder="Pick a usename" className="usernameInput" />
                </div>
                <button onClick={(room) => setIsOpen((prevstate) => !prevstate)} className="roomButton">
                    Choose room
                </button>
                {isOpen && <Rooms setRoomState={getRoomState} />}
                <span className="enryptText">Try to encrypt your messages !</span>
                <div className="switchWrapper">
                    <div onClick={() => setSwitchOn((prevstate) => !prevstate)} className="switchButton"></div>
                </div>
                {switchOn && !isOpen ? <Secret /> : null}
            </div>
            <button className="joinButton" onClick={() => handleSubmit(username, room)}>
                Join!
            </button>
        </div>
    );
};

export default Join;
