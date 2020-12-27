exports.checkIfUserExist = (usersList, user) => {
    const { username } = user;
    usersList.forEach((element) => {
        if (element.username === username) {
            console.log(element.username === username);
            return true;
        }
        return false;
    });
};
exports.setUsersUpdate = async (usersList, user, io) => {
    try {
        let isDouble = false;
        const roomArray = usersList[user.room];
        const { username } = user;
        for (const activUser of roomArray) {
            if (activUser.username === username) {
                isDouble = true;
                return roomArray;
            }
        }
        if (!isDouble) {
            roomArray.push(user);
            return roomArray;
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
};

exports.onlineSockets = async (value, io, usersInRooms) => {
    const onlineSockets = Object.entries(io.sockets.adapter.rooms);
    console.log(onlineSockets);
    for (const [key, mongo] of onlineSockets) {
        for (const singleUser of usersInRooms[value.room]) {
            if (singleUser) {
                if (singleUser.id !== key) {
                    const elemToRemove = usersInRooms[value.room].indexOf(singleUser);
                    const updatedRoomUsers = usersInRooms[value.room].splice(elemToRemove, 1);
                    io.to(value.room).emit('usersListUpdate', usersInRooms[value.room]);
                }
            }
        }
    }
};
