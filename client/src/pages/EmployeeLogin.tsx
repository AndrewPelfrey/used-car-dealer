import React, { useState } from "react";
import axios from 'axios';

const EmployeeLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      // Sends POST request
      try {
        const response = await axios.post('http://localhost:3001/auth/login', {
          username,
          password,
        });

// Stores the JWT token on successful login
        localStorage.setItem('jwt', response.data.token);

        window.location.href = '/';
      } catch (err) {
        setError('Invalid login information. Please try again');
      }
    };

  
    return (
      <div className="user-login">
        <h2>Employee Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
             />
          </div>
          <div>
            <input type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
             />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default EmployeeLogin;