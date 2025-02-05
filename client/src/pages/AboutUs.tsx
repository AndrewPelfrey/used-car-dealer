import { useState } from "react";

function AboutUs() {
    const [count, setCount] = useState(0);
  
    return (
      <>
        <div>
        </div>
        <h1>About Us</h1>
        <div className='card'>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/pages/AboutUs.jsx</code> and save to test HMR
          </p>
        </div>
      </>
    );
  }
  
  export default AboutUs;