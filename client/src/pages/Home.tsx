import { useState } from 'react';


import "../styles/home.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
      </div>
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