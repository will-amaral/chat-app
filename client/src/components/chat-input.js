import React, { Component } from 'react';

const ChatInput = props => {

	return(
		<div className="field">
			<form className="control" onSubmit={props.onSubmit}>
				<input 
				className="input is-primary" 
				type="text" 
				placeholder="Digite a sua mensagem" 
				value={props.value}
				onChange={props.onChange} 
				/>
			</form>
		</div>
	);
}

export default ChatInput;