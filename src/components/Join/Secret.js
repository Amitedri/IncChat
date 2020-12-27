import React from 'react';

const Secret = () => {
    const setSecretKey = (event) => {
        return window.localStorage.setItem('secret', event.target.value);
    };
    return (
        <div className="secretKeyWrapper">
            <input
                type="text"
                placeholder="Enter your key"
                onInput={(event) => setSecretKey(event)}
            />
        </div>
    );
};

export default Secret;
