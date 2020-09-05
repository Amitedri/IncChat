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
    socket.on('join', ({ username, room }) => {
        socket.join(room, function () {
            users.push({ username, room });
            io.of('/').adapter.clients([room], (err, clients) => {
                console.log(clients); // an array containing socket ids in 'room1' and/or 'room2'
            });
            io.in(room).emit('updateConnectedUsers', users);
        });

        io.in(room).emit('greetNewUser', {
            message: `${username} has join room ${room}`,
            username: 'Admin',
        });
    });

    //new message
<<<<<<< HEAD
    socket.on("message", ({ username, room, message }) => {
        io.emit("distMessage", { username, message });
=======
    socket.on('message', ({ username, room, message }) => {
        io.in(room).emit('disMessage', { username, message });
>>>>>>> 4ea97a18e7bff03fcbe40f3b54754148776d56db
    });
    socket.on('disconnect', ({ username, room }) => {
        console.log(username);

        io.in(room).emit('updateConnectedUsers', users, (users) => {
            const updatedUsersArray = users.filter(
                (user) => user.username !== username
            );
            return (users = [...updatedUsersArray]);
        });
        return socket.disconnect();
    });
});
httpServer.listen(port, () => {
    console.log('server on');
    // connectToDB();
    //IMPLEMENT DB CONNECTION
});
