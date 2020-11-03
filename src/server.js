const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectToDB = require('./DB/dbConnection');
const cors = require('cors');
const port = 5000;

const app = express();
app.use(cors());

//using http module to create a server
const httpServer = http.createServer(app);

const io = socketIo(httpServer);
let userObj;
let temp;
const usersInRoom = {
    Javascript: [],
    Pentest: [],
    Python: [],
};
const generateMessage = (username, text) => {
    return {
        username: username,
        message: text,
        date: Date.now(),
    };
};

const removeUserFromList = (user, users) => {
    const updatedUsersList = users.filter(
        (usr) => usr.username === user.username
    );
    return users;
};
const addUsersToList = (user) => {
    switch (user.room) {
        case 'Javascript':
            usersInRoom.Javascript.push(user);
            break;
        case 'Pentest':
            usersInRoom.Pentest.push(user);
            break;
        case 'Python':
            usersInRoom.Python.push(user);
            break;
        default:
            break;
    }
};
const getUsersFromRoom = (room, users) => {
    for (const [key, value] of Object.entries(users)) {
        if (key === room) {
            return users[key];
        }
        if (Object.entries(users).lengt < 1) {
            console.log(usersInRoom[key]);
            // return usersInRoom[key];
        }
    }
};
const removeDisconnectedUser = () => {
    const updatedArray = removeUserFromList(userObj, usersInRoom[userObj.room]);
    console.log(updatedArray);
    // console.log(userObj.room);
    io.to(userObj.room).emit('updateUserList', updatedArray);
};

io.on('connect', (socket) => {
    socket.emit('newLogin');
    socket.on('getUserData', (user) => {
        temp = JSON.stringify(user);
        userObj = JSON.parse(temp);

        socket.join(user.room, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            //
            addUsersToList(user);
            //////////////////////////////////////////
            io.to(user.room).emit(
                'updateUserList',
                getUsersFromRoom(userObj.room, usersInRoom)
            );
        });

        const welcomeString = `${user.username} has joined room ${user.room}!`;

        return io
            .to(user.room)
            .emit('newUserAnnounce', generateMessage('Admin', welcomeString));
    });

    socket.on('newMessage', (value) => {
        io.to(userObj.room).emit('messageInRoom', value);
    });
    socket.on('requestSocketsList', (value) => {
        const maybe = io.sockets.adapter.rooms[value.room].sockets;
        io.emit('onlineSockets', { users: maybe });
    });

    socket.on('disconnect', removeDisconnectedUser);

    setInterval(() => {
        socket.emit('ping');
    }, 10000);

    socket.on('pang', () => {
        let newUsersArray = [];
        const socketsArray = Object.entries(
            io.sockets.adapter.rooms[userObj.room].sockets
        );
        const usersArray = Object.entries(usersInRoom[userObj.room]);
        for (const [socketValue, value] of socketsArray) {
            for (const [key, userValue] of usersArray) {
                if (socketValue != userValue.id) {
                    return
                }
                newUsersArray.push('aa')
                return 
            }
        }
    });
});

httpServer.listen(port, () => {
    console.log('server on');
    // connectToDB();
    //IMPLEMENT DB CONNECTION
});
