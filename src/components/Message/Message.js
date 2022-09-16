import './Message.css';

function Message(props) {
    const { user, message, time } = props;
    if (user === "Admin") {
        return (
            <div className="admin">
                <div className="message">{message}</div>
            </div>
        )
    }else if (user && user !== "Admin") {
        return (
            <div className="left"  >
                <div className="username">{user}</div>
                <div className="message">{message}</div>
                <div className="time">{time}</div>
            </div>
        )
    }
    else {
        return (
            <div className="right"  >
            <div className="message">{message}</div>
            <div className="time">{time}</div>
        </div>
        )
    }
}

export default Message;