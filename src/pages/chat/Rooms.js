import React from 'react';
import Room from './Room';
import { useState, useEffect } from 'react';
import ChatService from '../../services/chat.service'
import AuthService from '../../services/auth.service';
import "./Rooms.css"

function Rooms(props) {
    const [message, setMessage] = useState("");
    const [newMessages, setNewMessages] = useState([]);
    const [recievers, setRecievers] = useState([]);
    const [chatToggle, setChatToggle] = useState(false);

    useEffect(() => {
        // Get the recievers id
        const reciever_ids = props.room_data.users.filter(item => item !== props.data.user_data.userId)
        // Get the recievers data
        reciever_ids.forEach(reciever_id => {
            AuthService.userData(reciever_id).then((response) => {
                setRecievers([response]);
            })
        })
        // Get all new messges
        ChatService.all_new().then((resp) => {
            const list = [];
            for (let i = 0; i < resp.length; i++) {
                if (resp[i].user_id === props.user_id &&
                    resp[i].room_id === props.room_id) {
                    list.push(resp[i])
                }
            }
            setNewMessages(list);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Delete new messages if in room
    useEffect(() => {
        if (props.room === props.room_id) {
            setTimeout(() => {
                ChatService.delete_new({
                    "room_id": props.room_id,
                    "user_id": props.user_id
                })
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.messages])

    const messages = [];

    // Filter the messages in the room
    for (let i = 0; i < props.messages.length; i++) {
        if (props.messages[i].room_id === props.room_id) {
            messages.push(props.messages[i]);
        }
    }


    const handleSend = (e) => {
        e.preventDefault();
        if (message !== "") {
            // Add message to the socket
            props.socket.emit("message", {
                user_id: props.user_id, 
                username: props.username, 
                message, 
                room: props.room_id
            });
            // Add message to the database
            ChatService.add_messages({
                "message": message,
                "user_id": props.user_id,
                "room_id": props.room_id,
            }).then(resp => {
                recievers.forEach(user => {
                    ChatService.add_new({
                        "message_id": resp.id,
                        "user_id": user.id,
                        "room_id": props.room_id
                    })
                })
            })
            setMessage("");
        }
    }

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const deleteNew = () => {
        ChatService.delete_new({
            "room_id": props.room_id,
            "user_id": props.user_id
        })
    }

    let count = newMessages.length;

    if (props.room === props.room_id) {
        count = 0;
    } else {
        for (let i = 0; i < props.messages.length; i++) {
            if (
            props.messages[i].room_id === props.room_id &&
            props.messages[i].user_id !== props.user_id &&
            props.messages[i].new === true
            ) {
                count++;
            }
        }
    }

    const ToggleChat = () => {
        setChatToggle(prev => !prev);
    }
    
    return (
        <div onClick={() => {props.handleRoom(props.room_id) ; deleteNew()}} className={props.isStaff ? "room bc_2" : ""}>
            <div onClick={ToggleChat}>
                <div className={props.isStaff ? 'room_container' : ""}>
                    {recievers.map((reciever, index) => {
                        if (props.isStaff) {
                            return (
                                <h3 key={index} style={{margin: "0", flex: "1"}}>
                                    {reciever.username}
                                </h3>
                            )
                        } else {
                            return (
                                <img key={index} className='chat_icon' src='/icons/chat_icon.png'/>
                            )
                        }
                    })}

                    { count !== 0 &&
                        <div className='count_new'>
                            <h6 style={{margin: "0"}}>{count}</h6>
                        </div>
                    }
                </div>

                {props.isStaff &&
                <h5 className='last_message'>{messages[messages.length - 1]?.message}</h5>
                }
            </div>

            {props.room_id === props.room && 
            <Room
                room_id={props.room_id}
                room={props.room}
                messages={messages}
                message={message}
                data={props.data}
                username={props.username}
                user_id={props.user_id}
                onChange={onChange}
                handleSend={handleSend}
                removeRoom={props.removeRoom}
                recievers={recievers}
                chatToggle={chatToggle}
                ToggleChat={ToggleChat}
            />}
        </div>
    );
}

export default Rooms;