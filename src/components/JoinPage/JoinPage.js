import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import './JoinPage.css';
let user;
function JoinPage() {
    const [name, setName] = useState("");
    return (
        <div className="joinpage-container">
            <div className="join-form">
                <img src={logo} alt="logo" />
                <input placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                <Link onClick={(e)=>!name ? e.preventDefault(): null} to="/chat" ><button  className="join-btn" onClick={() => user = name}>Join Chat</button></Link>
            </div>
        </div>
    );
}

export default JoinPage;
export { user };