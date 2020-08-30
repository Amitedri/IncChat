import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Join from "./components/Join/Join";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import { Route, Switch, BrowserRouter } from "react-router-dom";


const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/chat" component={() => <ChatRoom />} />
                <Route exat path="/" component={() => <Join />} />
            </Switch>
        </div>
    );
};

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
