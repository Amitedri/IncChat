import React, { useState, useEffect } from "react";
import "./Join.css";
import socketio from "socket.io-client";

const Join = ({location}) => {

    const [userName, setUserName] = useState("");

    const [room, setRoom] = useState("");

    const handleJoin = () => {
        window.localStorage.setItem("userName", userName);
        window.localStorage.setItem("room", room);
        window.location.href = '/chat';
    };


    return (
        <div className="joinContainer">
            <div className="inputs">
                <h1>Start Chatting</h1>
                <input
                    onInput={(event) => setUserName(event.target.value)}
                    placeholder="Enter a user name"
                />
                <input
                    onInput={(event) => setRoom(event.target.value)}
                    placeholder="Anter a room"
                />
            </div>
            <div className="controllers">
                <button onClick={handleJoin}>Join!</button>
            </div>
        </div>
    );
};

export default Join;
