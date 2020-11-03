export const initSocket = (
    setIsSocketOpen,
    io,
    socketio,
    endPoint,
    userObj
) => {
    setIsSocketOpen(true);

    io = socketio.connect(endPoint);

    io.emit('newLogin', userObj());
    return () => {
        io.emit('disconnect');
        io.off();

        setIsSocketOpen(false);
    };
};
