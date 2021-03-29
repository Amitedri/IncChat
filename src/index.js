import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Join from './components/Join/Join';
import ChatRoom from './components/ChatRoom/ChatRoom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import particlesConfig from './particlesConfig.json';

const App = () => {
    //setting particles effect
    useEffect(() => {
        const particlesJS = window.particlesJS;
        particlesJS('particles-js', particlesConfig);
    }, [window.location]);

    return (
        <div>
            <div id="particles-js">
                <Switch>
                    <Route exact path="/chat" component={() => <ChatRoom />} />
                    <Route exat path="/" component={Join} />
                </Switch>
            </div>
        </div>
    );
};

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
