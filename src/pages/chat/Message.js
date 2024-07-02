import React from 'react';

function Message(props) {

    let style
    if (props.msg.type === "join") {
        style = {
            fontSize: ".8rem"
        }
    } else if (props.msg.user_id === props.user_id) {
        style = {
            alignSelf: "flex-end",
            backgroundColor: "#a6e4ab",
            borderRadius: "5px",
            margin: "2px 4px"
        }
    } else if (props.msg.username !== props.username) {
        style = {
            alignSelf: "flex-start",
            backgroundColor: "#a6dde4",
            borderRadius: "5px",
            margin: "2px 4px"
        }
    }
    const toLocal = (utc) => {
        const time = new Date(utc).getTime()
        const offset = new Date(utc).getTimezoneOffset() * 60 * 1000
        return new Date(time - offset);
    }

    const prevDate = toLocal(props.prevDate.created_at).toDateString();
    const utcDate = toLocal(props.msg.created_at).toDateString();

    const time = toLocal(props.msg.created_at).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit"
    });
    return (
        <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            {
                prevDate !== utcDate &&
                <p>{utcDate}</p>
            }
            <div style={style}>
                <h3> {props.msg.message} </h3>
                <p>{time}</p>
            </div>
        </div>
    )
}

export default Message;