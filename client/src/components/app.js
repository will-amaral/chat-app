import React, {	Component } from 'react';
import socketIOClient from 'socket.io-client';
import Chat from './chat';
import Login from './login';

var socket;

class App extends Component {
	constructor(props) {
		super(props);
		this.messages = [];
		this.timeout = null;
		this.state = {
			text: '',
			messages: this.messages,
			isConected: false,
			username: '',
			typing: false,
			userTyping: '',
			users: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		socket = socketIOClient();
	}

	componentDidMount() {
		socket.on('chat message', data => {
			console.log(data);
			this.messages.push(data);
			this.setState({ messages: this.messages });
		});

		socket.on('user joined', data => {
			console.log(data);
			this.messages.push(data);
			this.setState({ messages: this.messages });
		});

		socket.on('user left', data => {
			console.log(data);
			this.messages.push(data);
			this.setState({ messages: this.messages });
		});

		socket.on('typing', data => {
			this.setState({ typing: true, userTyping: data.username });
			console.log(data);
		});

		socket.on('stop typing', () => {
			this.setState({ typing: false });
			console.log('Parou de digitar');
		});

		socket.on('total users', users => {
			this.setState({ users });
		});
	}
	
	handleChange(event) {
		this.setState({ text: event.target.value});
		if (this.state.isConected) {
			if (!this.state.typing) {
				socket.emit('typing');
			}
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(() => { socket.emit('stop typing') }, 420);
		}
	}

	handleSubmit(event) {
		this.messages.push({
			username: 'Eu',
			message: this.state.text
		})
		socket.emit('chat message', this.state.text);
		this.setState({ text: '' });
		event.preventDefault();
	}

	handleLogin(event) {
		if (this.state.text == 'Eu' || this.state.text == '') 
			return alert('Você não pode usar esse nome de usuário');
		socket.emit('add user', this.state.text);
		this.setState({ username: this.state.text, isConected: true, text: '' })
		event.preventDefault();
	}

	render() {
		if (!this.state.isConected) {
			return <Login
						value={this.state.text}
						onChange={this.handleChange}
						onSubmit={this.handleLogin}
					/>
		}
		return <Chat 
					value={this.state.text}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
					messages={this.state.messages}
					warnings={this.state.warnings}
					typing={this.state.typing}
					userTyping={this.state.userTyping}
					users={this.state.users}
				/>
	}
}

export default App;