import React, { useEffect, useState } from 'react';
import ChatService from '../../services/chat.service'
import AuthService from '../../services/auth.service'
import Rooms from './Rooms';
import io from "socket.io-client"
import "./Chat.css"
import proxy from '../../services/proxy';


const socket = io.connect(proxy)

function Chat(props) {
    const [rooms, setRooms] = useState({});
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [showRooms, setShowRooms] = useState(false);

    const data = AuthService.getCurrentData();
    const username = data.user_data.username
    const user_id = data.user_data.userId

    useEffect(() => {
        // Fetch all rooms
        ChatService.get_all_rooms().then((response) => {
            const obj = response;
            // Filter rooms that need to be joined
            for (const key in obj) {
                if (!obj[key].users.includes(data.user_data.userId)) {
                    delete obj[key];
                }
            }
            setRooms(obj);
            // Join all the rooms of the user
            Object.keys(obj).forEach((room_id) => {
                socket.emit("join", { room: room_id, username, user_id })
            })
        })

        // Fetch all messages
        ChatService.get_all_messages().then((response) => {
            // Filter only the messages of the user
            if (response.user_id === data.user_data.user_id) {
                setMessages(response)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Set the new message to the messages list
    useEffect(() => {
        socket.on("message", msg => {
            const localTime = new Date().getTime();
            const offset = new Date(localTime).getTimezoneOffset() * 60 * 1000;
            const utcTime = localTime + offset;
            
            setMessages(prevMessages => [...prevMessages, {...msg, created_at: new Date(utcTime)}]);
        })

        return () => {
            socket.off("message");
        }
    }, [messages.length])

    const handleRoom = (roomId) => {
        setRoom(roomId);
        const updatedMessages = messages.map(msg => ({ ...msg, "new": false }));
        setMessages(updatedMessages);
    }

    const removeRoom = () => {
        setRoom("");
    }

    const chatToggle = () => {
        setShowRooms(prev => !prev);
    }

    return (
        <div className='chat_button'>
            { props.isStaff ? 
            <div>
                <img alt='some alt' onClick={chatToggle} className='chat_icon' src='/icons/chat_icon.png' style={{
                    display: showRooms ? "none" : "block"
                }}/>
                <div className='rooms' 
                style={{
                    display: showRooms ? "block" : "none"
                }}>
                {Object.entries(rooms).map(([roomId, roomData], index) => {
                    return (
                        <Rooms
                            key={index}
                            data={data}
                            room={room}
                            messages={messages}
                            room_id={roomId}
                            user_id={user_id}
                            username={username}
                            room_data={roomData}
                            socket={socket}
                            handleRoom={handleRoom}
                            removeRoom={removeRoom}
                            isStaff={props.isStaff}
                        />
                    )
                })}
                </div>

            </div>
            
            :

            <div>
            {Object.entries(rooms).map(([roomId, roomData], index) => {
                return (
                    <Rooms
                        key={index}
                        data={data}
                        room={room}
                        messages={messages}
                        room_id={roomId}
                        user_id={user_id}
                        username={username}
                        room_data={roomData}
                        socket={socket}
                        handleRoom={handleRoom}
                        removeRoom={removeRoom}
                        isStaff={props.isStaff}
                    />
                )
            })}
            </div>

            }
        </div>
    );
}


export default Chat;