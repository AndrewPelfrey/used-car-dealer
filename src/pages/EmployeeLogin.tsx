import { useState } from "react";

function EmployeeLogin() {
    const [count, setCount] = useState(0);
  
    return (
      <>
        <div>
        </div>
        <h1>Employee Login Page</h1>
        <div className='card'>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/pages/EmployeeLogin.jsx</code> and save to test HMR
          </p>
        </div>
      </>
    );
  }
  
  export default EmployeeLogin;