import React, { useEffect, useRef, useState } from 'react';

const [username, setUsername] = useState('');
const [room, setRoom] = useState('');
const [isOpen, setIsOpen] = useState('');

export const createRoomList = (roomButtonRef,parentRef) => {
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
export const handleRoomPopup = () => {
    if (!isOpen) {
        createRoomList();
    }
};
export const removePopup = (event,parentRef) => {
    setIsOpen(false);
    parentRef.current.removeChild(parentRef.current.lastChild);
};

export const handleJoin = () => {
    if (room && username) {
        window.location = '/chat';
    }
};
export const handleUserName = (event) => {
    //TODO check if user exist
    window.localStorage.setItem('username', event.target.value);
    return setUsername(event.target.value);
};
