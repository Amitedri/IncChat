export const handleUserName = (event, setUsername) => {
    //TODO check if user exist
    window.localStorage.setItem('username', event.target.value);
    return setUsername(event.target.value);
};
const highlightMissingFields = (username, room) => {
    if (!username) {
        const usernameInput = document.querySelector('.inputWrapper');
        usernameInput.classList.add('error');
        setTimeout(() => {
            usernameInput.classList.remove('error');
        }, 1000);
    }
    if (!room) {
        const roomButton = document.querySelector('.roomButton');
        roomButton.classList.add('error');
        setTimeout(() => {
            roomButton.classList.remove('error');
        }, 1000);
    }
};
export const handleSubmit = (username, room) => {
    username && room
        ? (window.location = '/chat')
        : highlightMissingFields(username, room);
};
