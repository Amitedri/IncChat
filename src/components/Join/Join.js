import React, { useEffect, useRef, useState } from 'react';
import './Join.css';
const Join = () => {
    const parentRef = useRef(null);
    const roomButtonRef = useRef(null);
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [isOpen, setIsOpen] = useState('');

    const handleUserName = (event) => {
        //TODO check if user exist
        window.localStorage.setItem('username', event.target.value);
        return setUsername(event.target.value);
    };

    const createRoomList = () => {
        const elem = document.createElement('div');
        elem.classList.add('div');
        elem.classList.add('roomPopup');
        elem.addEventListener('mouseleave', removePopup);

        const elems = ['Javascript', 'Pentest', 'Low-level'];
        parentRef.current.append(elem);

        elems.forEach((el) => {
            const spanElem = document.createElement('span');
            spanElem.textContent = el;
            const parent = document.getElementsByClassName('roomPopup')[0];
            parent.append(spanElem);
        });
        elem.addEventListener('click', (event) => {
            roomButtonRef.current.textContent = event.target.textContent;
            setRoom(event.target.textContent);
            window.localStorage.setItem('room', event.target.textContent);
        });
        setIsOpen(true);
        return elem;
    };
    const handleRoomPopup = () => {
        if (!isOpen) {
            createRoomList();
        }
    };
    const removePopup = (event) => {
        setIsOpen(false);
        parentRef.current.removeChild(parentRef.current.lastChild);
    };

    const handleJoin = () => {
        if (room && username) {
            window.location = '/chat';
        }
    };
    return (
        <div className="joinContainer">
            <div ref={parentRef} className="topContent">
                <div className="textHeader">Chatty</div>
                <input
                    onInput={handleUserName}
                    type="text"
                    placeholder="Pick a usename"
                />
                {/* <button className="randomUserButton" /> */}
                <button
                    ref={roomButtonRef}
                    onClick={handleRoomPopup}
                    className="roomButton"
                >
                    Choose room
                </button>
            </div>
            <div className="bottomContent">
                <button onClick={handleJoin} className="joinButton">
                    Join now
                </button>
            </div>
        </div>
    );
};

export default Join;
