const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectToDB = require('../DB/dbConnection');
const cors = require('cors');
const {addUserToList,onlineSockets,generateMessage} = require('./Utils')
const port = 5000;

const app = express();
app.use(cors());

//using http module to create a server
const httpServer = http.createServer(app);

const io = socketIo(httpServer);

let usersInRooms = {
    Javascript: [],
    Pentest: [],
    Python: [],
};
let disconnectSocket;

io.on('connect', (socket) => {
    //request info of client
    socket.emit('newLogin');

    socket.on('getUserData', (user) => {
        //add client to users array
        addUserToList(user, usersInRooms);
        io.emit('usersListUpdate', usersInRooms[user.room]).to(user.room);
        // adding user to room and emitting event with a string
        socket.join(user.room, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
        //annouce in room
        const welcomeString = `${user.username} has joined room ${user.room}!`;

        return io
            .to(user.room)
            .emit('messageFromServer', generateMessage('Admin', welcomeString));
    });
    
    socket.on('message', (message) => {
        io.to(message.room).emit('messageFromServer', message);
    });

    socket.on('disconnect', (value) => {
        io.emit('ping');
    });
    socket.on('requestUsersUpdate', (value) => {
        onlineSockets(value,io,usersInRooms);
    });
});

httpServer.listen(port, () => {
    console.log('server on');
    // connectToDB();
    //IMPLEMENT DB CONNECTION
});
