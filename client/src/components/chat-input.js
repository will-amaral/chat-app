import React from 'react';
import { Control, Input } from 'bloomer';

const ChatInput = props => {
	return(
			<Control tag="form" onSubmit={props.onSubmit}>
				<Input
					className="is-fixed-bottom"
					isSize="large"
					isColor="primary"
					placeholder="Digite a sua mensagem aqui"
					type="text"
					value={props.value}
					onChange={props.onChange}
				/>
			</Control>
	);
}

export default ChatInput;