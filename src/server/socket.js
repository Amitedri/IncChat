const initServerSocket = (io,setUsersUpdate,onlineSockets,usersInRooms) => {
    io.of('/chat').on('connection', (socket) => {
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
                return io.of('/chat').to(user.room).emit('messageFromServer', { username: 'Admin', message: welcomeString });
            });
            //add client to users array
            const updateUsers = await setUsersUpdate(usersInRooms, user, io);
            // user.secret !== null || user.secret !== undefined ? io.of('/chat').use(encrypt(user.secret)) : null;

            return io.of('/chat').to(user.room).emit('usersListUpdate', updateUsers);
        });

        socket.on('message', (message) => {
            io.of('/chat').to(message.room).emit('messageFromServer', message);
        });

        socket.on('disconnect', () => {
            io.of('/chat').emit('userOut');
        });
        socket.on('requestUsersUpdate', async (value) => {
            const isFilterd = await onlineSockets(value, io, usersInRooms);
        });
    });
};


module.exports = initServerSocket;