const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectToDB = require('../src/DB/dbConnection');
const { userInfo } = require('os');
const port = 5000;

const app = express();
//using http module to create a server
const httpServer = http.createServer(app);

var users = [];
const io = socketIo(httpServer);
io.on('connection', (socket) => {
    socket.on('join', ({ username, room , id }) => {
            console.log(socket.id)
        socket.join(room, function () {
            users.push({ username, room , id });
            // an array containing socket ids specific room
            io.of('/').adapter.clients([room], (err, clients) => {
            });
            io.in(room).emit('updateConnectedUsers', users);
            console.log('users1',users)
        });

        io.in(room).emit('greetNewUser', {
            message: `${username} has join room ${room}`,
            username: 'Admin',
        });
    });

    //new message
    socket.on('message', ({ username, room, message }) => {
        io.in(room).emit('disMessage', { username, message });
    });
    socket.on('disconnect', ({ username, room , id }) => {
        const updatedUserArray = users.filter((user)=>{
            user.id === id;
        })
        console.log(updatedUserArray)
    });
});
httpServer.listen(port, () => {
    console.log('server on');
    // connectToDB();
    //IMPLEMENT DB CONNECTION
});
