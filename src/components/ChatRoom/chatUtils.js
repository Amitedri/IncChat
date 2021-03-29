import React from 'react';
import Colors from './Colors';
export const userObj = (username, room, id, secret) => {
    return {
        username,
        room,
        id: id,
    };
};

export const mapUsers = (users, Colors) => {
    return users.map((user, i) => {
        let randomColor = () => Math.floor(Math.random() * Colors.length - 1);
        const color = Colors[randomColor()];
        if (user !== undefined || user !== null) {
            return (
                <div key={i} className="onlineUserContainer">
                    <div className="userThumbnailImage" style={{ backgroundColor: `${color}` }}></div>
                    <div className="userInfoContnet">
                        <span>{user.username}</span>
                    </div>
                </div>
            );
        }
    });
};
export const mapMessages = (messages, username) => {
    return messages.map((message, index) => {
        return (
            <div key={index} className={'messageWrapper'}>
                <span className="sender">{message.username + ': '}</span>
                <span className="content">{message.message}</span>
            </div>
        );
    });
};
export const handleUsersUpdate = (setUsers, users) => {
    return setUsers(() => users);
};

export const handleNewMessage = (setMessages, message) => {
    return setMessages((prevState) => [...prevState, message]);
};
export const sendMessage = (message, username, io, room) => {
    const messageObj = {
        message,
        username,
        room,
    };

    io.emit('message', messageObj);
    let input = document.querySelector('.keyboard input');
    input.value = '';
};

// export const updateMessageInput = React.useCallback((input, setMessage) => setMessage(() => input));
