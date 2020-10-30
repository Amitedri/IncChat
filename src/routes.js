const router = require('express').Router();
router.route('/chat').get(async (req, res, next, httpServer) => {
    try {
        const io = socketIo(httpServer);

        io.on('connect', (socket) => {
            const clients = io.of('/chat').clients();
            console.log(clients);
            socket.on('join', (userObj) => {
                const { username, room, id } = userObj;

                socket.join(room, function () {
                    return io.in(room).emit('greetNewUser', {
                        message: `${username} has join room ${room}`,
                        username: 'Admin',
                    });
                });
            });

            //new message
            socket.on('message', ({ username, room, message }) => {
                io.in(room).emit('disMessage', { username, message });
            });
            // socket.on('disconnect', ({ username, room, id }) => {
            //     //
            // });
        });
    } catch (err) {
        if (err) throw new Error('Something went wrong in creating user on DB');
        return res.status(500).json({
            success: 'false',
            message: 'something went wrong, please try gain',
        });
    }
});

exports.router;
