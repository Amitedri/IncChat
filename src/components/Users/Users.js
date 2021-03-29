import React, { useEffect, useRef, useState } from 'react';
import './Users.css';
import Colors from '../ChatRoom/Colors';
import { mapUsers } from '../ChatRoom/chatUtils';
const Users = React.memo(
    ({ usersList }) => {
        return (
            <div className="usersContainer">
                <div className="onlineUsersContainer">{mapUsers(usersList, Colors)}</div>
            </div>
        );
    },
    (prev, next) => {
        if (prev.usersList !== next.usersList) {
            return false;
        }
        return true;
    }
);

export default Users;
