import { Outlet } from 'react-router-dom';
import Nav from './components/Nav.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';


function App() {
  return (
    <div>
      <Header />
      <Nav /> {/* Navbar stays on all pages */}
      <main>
        <Outlet /> {/* This will render the correct page based on the route */}
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
