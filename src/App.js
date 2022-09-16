import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JoinPage from './components/JoinPage/JoinPage';
import ChatPage from './components/ChatPage/ChatPage';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<JoinPage />}  />
        <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
