const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const encrypt = require('socket.io-encrypt');
require('dotenv').config();
const cors = require('cors');
const { setUsersUpdate, onlineSockets, generateMessage } = require('./Utils');
const port = process.env.PORT || port;
const jwt = require('jsonwebtoken');
const app = express();
//
var useSecret = false;
app.use(cors());
app.use(express.json())
app.post('/signIn', (req, res) => {
    useSecret = true;
})
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

io.use(encrypt('secret', (err, data) => {
    console.log(err)
}));

io.on('connect', (socket) => {

    //request info of client
    socket.emit('newLogin');

    //
    socket.on('getUserData', async (user) => {
        //add token on on new connection
        jwt.sign({ username: user.username }, 'secret', (err, data) => {
            if (err) {
                return console.log(err)
            }
            console.log(data)
        });

        // adding user to room and emitting event with a string
        socket.join(user.room, function (err) {
            if (err) {
                //logger implemntation will go here
                console.log(err);
                return;
            }
            //welcome string
            const welcomeString = `${user.username} has joined room ${user.room}!`;
            //emitting to room
            //currently this message is hard coded
            return io.to(user.room).emit('messageFromServer', { username: 'Admin', message: welcomeString });
        });
        //add client to users array
        const updateUsers = await setUsersUpdate(usersInRooms, user, io);
        //send the updated user array to client
        return io.to(user.room).emit('usersListUpdate', updateUsers);
    });
    //message from socket
    socket.on('message', (message) => {
        io.to(message.room).emit('messageFromServer', message);
    });

    socket.on('disconnect', () => {
        //It is not possible to pass data to disconnect event so there is emit as trigger
        io.emit('userOut');
    });
    socket.on('requestUsersUpdate', async (value) => {
        //trigger from client that compare socket.io in list to actually online sockets
        const isFilterd = await onlineSockets(value, io, usersInRooms);
    });
});
//listener
httpServer.listen(port, () => {
    console.log(`server running on port ${port}`);
});
