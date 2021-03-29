const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
const { setUsersUpdate, onlineSockets } = require('./Utils');
const initServerSocket = require('./socket');

const app = express();

//
const port = process.env.PORT || port;

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

initServerSocket(io, setUsersUpdate, onlineSockets, usersInRooms);

//listener
httpServer.listen(port, () => {
    console.log(`server running on port ${port}`);
});
