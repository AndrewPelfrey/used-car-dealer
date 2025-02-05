import { useState } from "react";

function CarSearch() {
    const [count, setCount] = useState(0);
  
    return (
      <>
        <div>
        </div>
        <h1>Car Search Page</h1>
        <div className='card'>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/pages/CarSearch.jsx</code> and save to test HMR
          </p>
        </div>
      </>
    );
  }
  
  export default CarSearch;