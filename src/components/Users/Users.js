import React, { useEffect, useRef, useState } from 'react';
import './Users.css';
let users, userObj;
let usersToMap;
const Users = (props) => {
    const usersRef = useRef(null);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers((prevState) => {
            console.log(users);

            return props.users;
        });
        // const appendChild = (text) => {
        //     const elem = document.createElement('div');
        //     elem.classList.add('userContainer');
        //     const valueElem = document.createElement('div');
        //     valueElem.classList.add('username');
        //     valueElem.textContent = text;
        //     elem.append(valueElem);
        //     return usersRef.current.append(elem);
        // };
        // if (users.length >= 1) {
        //     var count = 0;
        //     users.map((user) => {
        //         appendChild(user.username);
        //     });
        // }
    }, [props.users, window.location]);

    const maybe = () => {};
    return (
        <div className="usersContainer">
            <p>chats</p>
            <div className="usersOutsideContainer">
                <div ref={usersRef} className="usersInnerContainer" />
            </div>
        </div>
    );
};

export default Users;
