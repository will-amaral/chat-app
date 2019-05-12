import React from 'react';
import {
    Media,
    MediaContent,
    Content
} from 'bloomer';

const Message = props => {
    return(
        <Media>
            <MediaContent>
                <Content>
                    <p>
                        <strong style={{color: props.color}}>{props.name}</strong>
                        <br />
                        {props.message}
                    </p>
                </Content>
            </MediaContent>
        </Media>
    );
}

export default Message;