import React from 'react';

export const userObj = (username, room, id) => {
    return {
        username,
        room,
        id: id,
    };
};

export const mapUsers = (users, color) => {
    return users.map((user, i) => {
        if (user !== undefined || user !== null) {
            return (
                <div className="onlineUserContainer">
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
