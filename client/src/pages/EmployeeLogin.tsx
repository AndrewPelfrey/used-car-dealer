import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
        window.dispatchEvent(new Event("storage")); // Triggering the storage event

        setIsLoggedIn(true);
        navigate('/');
      } else {
        setLoginMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage")); // Triggering the storage event
    navigate('/');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {localStorage.getItem('username')}!</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      )}
      <div>{loginMessage}</div>
    </div>
  );
};

export default LoginForm;
