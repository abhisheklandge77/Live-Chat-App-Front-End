import { user } from '../JoinPage/JoinPage';
import './ChatPage.css';
import SendIcon from '../../assets/send.png';
import { Link } from 'react-router-dom';
import Message from '../Message/Message';
import ReactScrollTopToBottom from 'react-scroll-to-bottom';
import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
const ENDPOINT = "http://localhost:4500/";
let socket;

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [id, setId] = useState("");

    const sendMessage = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const time = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
        socket.emit('sendMessage', { message, id, time });
        setMessage("");
    }
    // console.log(messages);

    useEffect(() => {

        socket = socketIO(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setId(socket.id);
            console.log('User connected');
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages(messages => [...messages, data]);
        });

        socket.on('newUserJoined', (data) => {
            // console.log(`${data.user}: ${data.message}`);
            console.log("Hello 1233:::", data);
            setMessages(messages => [...messages, data]);
        });

        socket.on('userLeft', (data) => {
            // console.log(`${data.user}: ${data.message}`);
            setMessages(messages => [...messages, data]);
        });

        return () => {
            socket.emit('userDisconnect');
            socket.off();
        }
    }, []);

    useEffect(() => {
        socket.on('recieveMessage', (data) => {
            // console.log(data.user, data.message, data.id, data.time);
            setMessages(messages => [...messages, data]);
        });
        return () => {
            socket.off();
        }
    }, [messages]);
    return (
        <div className="chat-container">
            <div className="chatbox">
                <div className="header">
                    <div className="logo">LiveChat</div>
                    <Link to="/"><button className="close-btn">&times;</button></Link>
                </div>
                <ReactScrollTopToBottom className="message-container">
                    {
                        messages.map(item => {
                            return <Message key={Math.random()} message={item.message} time={item?.time} user={item.user === 'Admin' ? 'Admin': (item.id === id ? '': item.user)} />
                        })
                    }
                </ReactScrollTopToBottom>
                <div className="messagebox">
                    <input value={message} onChange={(e) => setMessage(e.target.value)}></input>
                    <button onClick={sendMessage}><img src={SendIcon} alt="send" /></button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;