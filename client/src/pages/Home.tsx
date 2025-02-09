import { useState, useEffect } from 'react';

import "../styles/home.css";

function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');

    if (storedUsername) {
      const alertDiv = document.createElement('div');
      alertDiv.textContent = `Welcome, ${storedRole} ${storedUsername}!`;
      alertDiv.style.position = 'fixed';
      alertDiv.style.top = '10px';
      alertDiv.style.left = '50%';
      alertDiv.style.transform = 'translateX(-50%)';
      alertDiv.style.backgroundColor = '#646cffaa';
      alertDiv.style.color = 'white';
      alertDiv.style.padding = '5px 10px';
      alertDiv.style.borderRadius = '5px';
      alertDiv.style.zIndex = '1000';
      alertDiv.style.fontSize = '10px';
      document.body.appendChild(alertDiv);

      setTimeout(() => {
        alertDiv.remove();
      }, 3000);
    }
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/Home.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default Home;
