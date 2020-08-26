const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port =  5500;

const app = express();

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

server.listen(port)
