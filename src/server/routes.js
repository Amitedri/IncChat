const router = require('express').Router();
const { addUserToList, onlineSockets, generateMessage } = require('./Utils');

router.route('/chat').get((req,res)=>{
        io.on('connect', (socket) => {
        socket.emit('newLogin');
        socket.on('getUserData', (user) => {
            addUserToList(user, usersInRooms);
            io.emit('usersListUpdate', usersInRooms[user.room]).to(user.room);
            // adding user to room and emitting event with a string
            socket.join(user.room, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
            });
            const welcomeString = `${user.username} has joined room ${user.room}!`;

            return io
                .to(user.room)
                .emit(
                    'messageFromServer',
                    generateMessage('Admin', welcomeString)
                );
        });

        socket.on('message', (message) => {
            io.to(message.room).emit('messageFromServer', message);
        });

        socket.on('disconnect', (value) => {
            io.emit('ping');
        });
        socket.on('requestUsersUpdate', (value) => {
            onlineSockets(value, io, usersInRooms);
        });
    });
})

module.exports = router;