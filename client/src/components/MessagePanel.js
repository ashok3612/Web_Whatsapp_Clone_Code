import React from 'react';
import './MessagePanel.css';
import { Messagebody } from './messagepanel_components/MessageBody';
import { Messageheader } from './messagepanel_components/MessageHeader';
import { Messagesender } from './messagepanel_components/MessageSender';
import { makeAutoScroll } from '..';

export function Messagepanel(props) {
    
    const messageSubmitHandler = () => {
        makeAutoScroll("#All_Messages_Div", 2000);
      };

    return (
        <div className="Message_MainPanel">
            <Messageheader/>
            <Messagebody/>
            <Messagesender
             submithandler = { messageSubmitHandler }/>
        </div>
    )
}
