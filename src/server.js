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

const generateMessage = (username, text) => {
    return {
        username: username,
        message: text,
        date: Date.now(),
    };
};

io.on('connect', (socket) => {
    socket.on('newLogin', (value) => {
        //sparing the obj came from client
        userObj = { ...value };
        //joining to room
        socket.join(value.room, function (err, success) {
            if (err) {
                //implement proper error handling
                return;
            }
        });

        const welcomeString = `${value.username} has joined room ${value.room}!`;

        return io
            .to(value.room)
            .emit('newUserAnnounce', generateMessage('Admin', welcomeString));
    });
    socket.on('newMessage', (value) => {
        console.log(value);
        io.to(userObj.room).emit('messageInRoom', value);
    });

    socket.on('disconnect', (value) => {
        console.log(`${userObj.username} has logged off`);
    });
});

httpServer.listen(port, () => {
    console.log('server on');
    // connectToDB();
    //IMPLEMENT DB CONNECTION
});
