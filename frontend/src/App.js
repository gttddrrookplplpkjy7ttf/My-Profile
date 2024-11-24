import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Welcome from '../src/dom/Welcome'; // นำเข้าไฟล์ Welcome

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนหน้า

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/login', { name, password });
      localStorage.setItem('authToken', res.data.token); // เก็บ Token
      setMessage(''); // เคลียร์ข้อความ
      navigate('/welcome'); // เปลี่ยนไปหน้า Welcome
    } catch (err) {
      if (err.response?.status === 404) {
        setMessage('User not found');
      } else if (err.response?.status === 400) {
        setMessage('Password Invalid');
      } else {
        setMessage('Error during login');
      }
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <div className="login-container">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;


