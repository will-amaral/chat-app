import React, {	Component } from 'react';

import Sidebar from './sidebar';
import ChatItem from './chat-item';
import ChatArea from './chat-area';
import ChatInput from './chat-input';
import Header from './header';
import SidebarItem from './sidebar-item';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1 className="title">Agora sim</h1>
				<Sidebar />
				<ChatItem />
				<ChatArea />
				<ChatInput />
				<Header />
				<SidebarItem />
			</div>
		);
	}
}

export default App;