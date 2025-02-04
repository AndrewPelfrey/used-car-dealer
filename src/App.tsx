import { Outlet } from 'react-router-dom';
import Nav from './components/Nav.tsx';
import Header from './components/Header.tsx';

function App() {
  return (
    <div>
      <Header />
      <Nav /> {/* Navbar stays on all pages */}
      <main>
        <Outlet /> {/* This will render the correct page based on the route */}
      </main>
    </div>
  );
}

export default App;
