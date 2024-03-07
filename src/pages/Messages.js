import React, { useEffect, useState } from 'react';
import ContService from '../services/cont.service';
import "./Messages.css"

function Messages() {
    const [data, setData] = useState([])
    useEffect(() => {
        ContService.get_all_messages().then((result) => {
            setData(result);
        })
    }, [])
    return (
        <div className='format_page messages_page'>
            <h1>Messages</h1>
            {data.map((info, index) => {
                return (
                    <div key={index} className='message bc_3'>
                        <p><b>Name:</b> {info.name}</p> 
                        <p><b>Email:</b> {info.email}</p>
                        <p><b>Message:</b> {info.message}</p>
                        <p>{info.created_at}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default Messages;