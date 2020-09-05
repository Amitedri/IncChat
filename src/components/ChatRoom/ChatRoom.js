import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import * as Components from "./components";
import socketio from "socket.io-client";

// import userImage from '../../assets/user.jpg'

const ChatRoom = ({ location }) => {
    const username = window.localStorage.getItem("userName");
    const room = window.localStorage.getItem("room");
    //
    //Chat data
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const endPoint = "http://127.0.0.1:5000/";
    const io = socketio.connect(endPoint);
    useEffect(() => {
        io.emit("join", { username, room });

        io.on("greetNewUser", (value) => {});

        io.on("updateConnectedUsers", (value) => {
            return setUsers([...value]);
        });

        io.on("distMessage", async ({ username, message }) => {
            setMessages([message])
            return setMessages([ message,...messages,]);
        });
        return () => {
            io.emit("disconnect", { username });
            io.off();
        };
    }, [endPoint, location.search]);

    const handleNewMessage = () => {
        io.emit("message", { username, room, message });
        console.log(messages);
        // io.emit("message", message);
    };
    //close socket on browser close
    window.onbeforeunload = function () {
        io.emit("disconnect", { username });
        return io.off();
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
                    {messages.map((message, index) => {
                        return (
                            <div key={index} className="messageContainer">
                                <div className="chatMessageSender">
                                    <p>{username}</p>
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
