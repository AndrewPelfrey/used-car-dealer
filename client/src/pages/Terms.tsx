import { useState } from "react";

function Terms() {
    const [count, setCount] = useState(0);
  
    return (
      <>
        <div>
        </div>
        <h1>Terms & Conditions Page</h1>
        <div className='card'>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/pages/Terms.jsx</code> and save to test HMR
          </p>
        </div>
      </>
    );
  }
  
  export default Terms;