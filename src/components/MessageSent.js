import React from 'react';
import "./MessageSent.css"

function MessageSent(props) {
    const style = {
        display: props.messageSuccess ? "block" : "none",
    }
    return (
        <div style={style} className='message_container'>
            <h3 className='message_success bc_gr c_2'>{props.text}</h3> 
        </div>
    );
}

export default MessageSent;