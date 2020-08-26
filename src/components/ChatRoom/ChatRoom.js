import React, {Component} from "react";
import "./ChatRoom.css";
class ChatRoom extends Component {
	state = {};
	render() {
		return (
			<div className="layoutContainer">
				<div className="users">
					<div className="userContainer">
						<div className="status on" />
						<div className="username">John</div>
					</div>
				</div>
				<div className="chatContainer">
					<div className="chatWindow">
						<div className="messageContainer">
							<div className="chatMessageSender"><p>James:</p></div>
							<div className="messageContent">Hi how are you?</div>
						</div>
					</div>
				</div>
				<div className="controls">
					<input placeholder='type something...'/>
					<button>Send</button>

				</div>
			</div>
		);
	}
}

export default ChatRoom;
