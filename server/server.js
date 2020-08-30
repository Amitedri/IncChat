const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectToDB = require("../src/DB/dbConnection");
const { userInfo } = require("os");
const port = 5000;

const app = express();
//using http module to create a server
const httpServer = http.createServer(app);

const io = socketIo(httpServer);
io.on("connect", (socket) => {
    //get username and room
    io.emit("getInfo");

    //joining to room
    socket.on("info", (value) => {
        console.log(value);
        // socket.join(room);
    });

    //new message
    socket.on('message',value=>{
        io.emit('message2',value)
    })
    socket.on("disconnect", () => {
        return socket.disconnect();
    });
});

httpServer.listen(port, () => {
    console.log("server on");
    // connectToDB();
    //IMPLEMENT DB CONNECTION
});
