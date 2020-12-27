import React, { useEffect } from 'react';

const Rooms = ({ setRoomState }) => {
    const roomNames = ['Javascript', 'Pentest', 'Python'];

    const setRoom = (event) => {
        setRoomState({ showCompoent: false, room: event.target.textContent });
        const elem = document.querySelector('.roomButton');
        elem.textContent = event.target.textContent;
        return window.localStorage.setItem('room', event.target.textContent);
    };

    return (
        <div className="roomPopup">
            {roomNames.map((room, i) => {
                return (
                    <div
                        key={i}
                        className="room"
                        onClick={(event) => setRoom(event)}
                    >
                        {room}
                    </div>
                );
            })}
        </div>
    );
};

export default Rooms;
