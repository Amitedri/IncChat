import React, { useEffect, useRef, useState } from 'react';
import './Users.css';
import { mapUsers } from '../ChatRoom/chatUtils';
const Users = React.memo(({ usersList,color }) => {
    return (
        <div className="usersContainer">
            <div className="onlineUsersContainer">{mapUsers(usersList,color)}</div>
        </div>
    );
});

export default Users;
