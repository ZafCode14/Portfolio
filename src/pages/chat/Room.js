import Message from './Message';
import { useRef, useEffect, useState } from 'react';
import "./Room.css"

function Room(props) {
    const chatAreaRef = useRef(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [props.messages]);

    const element = props.messages.map((msg, index) => {
        return (
            <Message 
                msg={msg}
                key={index}
                user_id={props.user_id}
                username={props.username}
                prevDate={index !== 0 && props.messages[index - 1]}
            />
        )
    })

    const style = {
        right: props.chatToggle ? "0%" : "-100%",
        transition: "1s ease",
        overflow: "hidden",
    }

    if (clicked) {
        setTimeout(() => {
            props.removeRoom();
            setClicked(false)
        }, 1000);
    }

    return (
        <div className='open_room bc_3' style={style}>
            { props.recievers.map((reciever, index) => {
                return (
                    <div key={index}>
                        <h3 className='room_header bc_2'>
                            {reciever.username}
                            <p className='right_arrow' onClick={() => {props.ToggleChat() ; setClicked(true)}}>&rarr;</p>
                        </h3>
                    </div>
                )
            })}

            <div className='chat_area' ref={chatAreaRef}>
                { element }
            </div>

            <form className='input_send bc_2'>
                <textarea
                value={props.message}
                name='message'
                onChange={(e) => props.onChange(e)}
                />
                <button onClick={(e) => props.handleSend(e)}>send</button>
            </form>
        </div>
    );
}

export default Room;