import React, { useState, useEffect } from 'react';
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
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), 
      });
    
      const data = await response.json();
    
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', data.role);
        window.dispatchEvent(new Event('storage'));
    
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setLoginMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginMessage('Login failed');
    }
  }
    

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage")); 
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
