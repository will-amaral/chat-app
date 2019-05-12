import React from 'react';
import { 
    Hero,
    HeroBody,
	Container,
	Field,
	Control,
    Input,
    Title,
    Subtitle
  } from 'bloomer';

const Login = props => {
	return (
		<Hero isFullHeight isColor="primary">
			<HeroBody>
				<Container hasTextAlign="centered">
                    <Title isSize={1}>
                        Chat App
                    </Title>
                    <Subtitle isSize={4}>
                        Entre um nome de usuário
                    </Subtitle>
					<Field>
						<Control tag="form" onSubmit={props.onSubmit}>
                            <Input 
                            isSize="large"
                            isColor="primary"
							placeholder="Meu nick"
							type="text"
							value={props.value}
                            onChange={props.onChange}
							/>
						</Control>
					</Field>
				</Container>
			</HeroBody>
		</Hero>
	);
}

export default Login;