import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', response.data.role);

        navigate(`/?username=${username}`);
      } else {
        setLoginMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage('Login failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='username:'
            required
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password:'
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      <div>{loginMessage}</div>
    </div>
  );
};

export default LoginForm;
