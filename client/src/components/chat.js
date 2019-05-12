import React, { Component } from 'react';
import {
    Section,
    Container,
    Notification,
    Columns,
    Column,
    Panel,
    PanelHeading,
    PanelBlock,
    PanelIcon
} from 'bloomer';
import ChatInput from './chat-input';
import Message from './message';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.messageEnd = React.createRef();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
		if (!this.messageEnd.current) return;
		this.messageEnd.current.scrollIntoView({ behavior: 'smooth'});
    }

    typing() {
        if (this.props.typing)
            return `${this.props.userTyping} está digitando`;
    }

    render() {
        console.log(this.props);
        const chatMessages = this.props.messages.map((msg, index) => {
            if (msg.warning) 
                return <Notification key={index} isColor="light">{msg.username}{msg.message}</Notification>
            return <Message key={index} name={msg.username} message={msg.message} color={msg.color}/>
        });

        const users = this.props.users.map((user, index) => {
            return <PanelBlock key={index}>
                    <PanelIcon className="fa fa-circle has-text-primary"/> 
                    {user}
                    </PanelBlock>
        });
        return(
            <Section>
                <Container isFluid style={{ marginBottom: 30 }}>
                <Columns>
                    <Column isSize="3/4">
                        {chatMessages}
                        <p style={{ marginTop: 15 }}ref={this.messageEnd}><em>{this.typing()}</em></p>
                    </Column>
                    <Column isHidden="mobile" style={{ position: 'sticky'}}>
                        <Panel>
                            <PanelHeading>
                                Usuários Online
                            </PanelHeading>
                            {users}
                        </Panel>
                    </Column>
                </Columns>               
                </Container>
                <ChatInput
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onSubmit={this.props.onSubmit}
                />
            </Section>
        );
    }
}

