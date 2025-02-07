import { Outlet } from 'react-router-dom';
import Nav from './components/Nav.tsx';


function App() {
  return (
    <div>
      <Nav /> {/* Navbar stays on all pages */}
      <main>
        <Outlet /> {/* This will render the correct page based on the route */}
        
      </main>
    </div>
  );
}

export default App;
