exports.generateMessage = (username, text) => {
    return {
        username: username,
        message: text,
        date: Date.now(),
    };
};

exports.addUserToList = (user, array) => {
    return array[user.room].push(user);
};
exports.onlineSockets = (value, io, usersInRooms) => {
    const onlineSockets = Object.entries(io.sockets.adapter.rooms);
    for (const [key, mongo] of onlineSockets) {
        for (const singleUser of usersInRooms[value.room]) {
            if (singleUser) {
                if (singleUser.id !== key) {
                    const elemToRemove = usersInRooms[value.room].indexOf(
                        singleUser
                    );
                    const updatedRoomUsers = usersInRooms[value.room].splice(
                        elemToRemove,
                        1
                    );
                    io.emit('usersListUpdate', updatedRoomUsers).to(value.room);
                }
            }
        }
    }
};
