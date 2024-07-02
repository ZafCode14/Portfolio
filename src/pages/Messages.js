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
    const handleDelete = (id) => {
        ContService.delete_message(id);
        setData(data.filter(item => item.id !== id));
    }
    return (
        <div className='format_page messages_page'>
            <h1>Messages</h1>
            {data.map((info, index) => {
                return (
                    <div key={index} className='message f_r bc_3'>
                        <div className=''>
                            <p><b>Name:</b> {info.name}</p> 
                            <p><b>Email:</b> {info.email}</p>
                            <p><b>Message:</b> {info.message}</p>
                            <p>{info.created_at}</p>
                        </div>
                        <button className='msg_btn' onClick={() => handleDelete(info.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default Messages;