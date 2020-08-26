import React, {Component} from "react";
import socket from 'socket.io-client';
import './Join.css'
class Join extends Component {
	constructor(){
		super();
		const endpoint = 'http://127.0.0.1:5000';
		this.socket = socket(endpoint)
	}
	state = {};

	render() {
		return <div className="joinContainer">
			<div className='inputs'>
				<h1>Start Chatting</h1>
				<input placeholder='Enter a user name'/>
				<input placeholder='Anter a room'/>
			</div>
			<div className="controllers">
				<button>Join!</button>
			</div>
        </div>;
	}
}

export default Join;
