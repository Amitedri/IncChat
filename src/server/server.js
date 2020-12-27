const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const encrypt = require('socket.io-encrypt');
require('dotenv').config();
const cors = require('cors');
const { setUsersUpdate, onlineSockets, generateMessage } = require('./Utils');
const port = process.env.PORT || port;

const app = express();
//
app.use(cors());

//using http module to create a server
const httpServer = http.createServer(app);
//init socket
const io = socketIo(httpServer);
//room options
let usersInRooms = {
    Javascript: [],
    Pentest: [],
    Python: [],
};
//socket logic
io.on('connection', (socket) => {
    //request info of client
    socket.emit('newLogin');
    socket.on('getUserData', async (user) => {
        // adding user to room and emitting event with a string
        socket.join(user.room, function (err) {
            if (err) {
                //logger implemntation will go here
                console.log(err);
                return;
            }
            const welcomeString = `${user.username} has joined room ${user.room}!`;
            return io.to(user.room).emit('messageFromServer', { username: 'Admin', message: welcomeString });
        });
        //add client to users array
        const updateUsers = await setUsersUpdate(usersInRooms, user, io);
        // user.secret !== null || user.secret !== undefined ? io.use(encrypt(user.secret)) : null;

        return io.to(user.room).emit('usersListUpdate', updateUsers);
    });

    socket.on('message', (message) => {
        io.to(message.room).emit('messageFromServer', message);
    });

    socket.on('disconnect', () => {
        io.emit('userOut');
    });
    socket.on('requestUsersUpdate', async (value) => {
        const isFilterd = await onlineSockets(value, io, usersInRooms);
    });
});
//listener
httpServer.listen(port, () => {
    console.log(`server running on port ${port}`);
});
