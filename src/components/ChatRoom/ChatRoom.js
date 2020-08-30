import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import * as Components from "./components";
import socketio from "socket.io-client";

// import userImage from '../../assets/user.jpg'

const ChatRoom = ({ userInfo }) => {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    //Chat data
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const endPoint = "http://127.0.0.1:5000/";
    const io = socketio.connect(endPoint);
    useEffect(() => {
        setRoom(window.localStorage.getItem("room"));
        setUserName(window.localStorage.getItem("userName"));

        io.emit("info", { userName, room });



        return () => {
            io.disconnect();
            io.off();
        };
    }, [userName,room]);

    useEffect(()=>{
        io.on("message2", (value) => {
            setMessage(value);
            setMessages([value]);
            console.log(messages);
        });
    },[messages])

    const handleNewMessage = () => {
        io.emit("message", message);
    };
    //close socket on browser close
    window.onbeforeunload = function () {
        console.log("out");
        io.emit("disconnect");
    };
    
    return (
        <div className="layoutContainer">
            <div className="usersContainerWrap">
                <p>chats</p>
                <div className="usersOutsideContainer">
                    <div className="quickContactContainer">
                        <div className="miniContact" />
                    </div>
                    <div className="usersInnerContainer"></div>
                </div>
            </div>
            <div className="chatContainer">
                <div className="chatWindow">
                    {messages.map((message,index) => {
                        return (
                            
                            <div key={index} className="messageContainer">
                                <div className="chatMessageSender">
                                    <p>{userName}</p>
                                </div>
                                <div className="messageContent">{message}</div>
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
