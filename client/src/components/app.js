import React, {	Component } from 'react';
import socketIOClient from 'socket.io-client';
import ChatInput from './chat-input';

const socket = socketIOClient('http://192.168.0.101:8081');

class App extends Component {
	constructor(props) {
		super(props);
		this.messages = [];
		this.state = {
			text: '',
			messages: this.messages
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		socket.on('chat message', data => {
			console.log(data);
			this.messages.push(<li key={data.id}>{data.message}</li>);
			this.setState({ messages: this.messages });
		});
	}
	
	handleChange(event) {
		this.setState({ text: event.target.value});
	}

	handleSubmit(event) {
		socket.emit('chat message', this.state.text);
		this.setState({ text: '' });
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<h1 className="title">Chat-App</h1>
				<ChatInput 
				onChange={this.handleChange} 
				onSubmit={this.handleSubmit} 
				value={this.state.text}/>
				<ul>
					{this.messages}
				</ul>
			</div>
		);
	}
}

export default App;