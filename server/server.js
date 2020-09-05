const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectToDB = require("../src/DB/dbConnection");
const { userInfo } = require("os");
const port = 5000;

const app = express();
//using http module to create a server
const httpServer = http.createServer(app);

var users = [];
const io = socketIo(httpServer);
io.on("connection", (socket) => {
    socket.on("join", ({ username, room }) => {
        socket.join(room, function () {
            users.push({ username, room });
            io.in(room).emit("updateConnectedUsers", users);
            return io
                .in(room)
                .emit("greetNewUser", `${username} has join room ${room}`);
        });
    });

    //new message
    socket.on("message", ({ username, room, message }) => {
        io.emit("distMessage", { username, message });
    });
    socket.on("disconnect", ({ username }) => {
        const updatedUsersArray = users.filter(
            (user) => user.username !== username
        );
        users = [...updatedUsersArray];
        return socket.disconnect();
    });
});
httpServer.listen(port, () => {
    console.log("server on");
    // connectToDB();
    //IMPLEMENT DB CONNECTION
});
