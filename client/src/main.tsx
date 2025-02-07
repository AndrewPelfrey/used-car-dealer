import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import AboutUs from './pages/AboutUs.tsx';
import CarSearch from './pages/CarSearch.tsx';
import Terms from './pages/Terms.tsx';
import EmployeeLogin from './pages/EmployeeLogin.tsx';
import Contact from './pages/ContactForm.tsx';
import Messages from './pages/Messages.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'car-search', element: <CarSearch /> },
      { path: 'terms', element: <Terms />},
      { path: 'employee-login', element: <EmployeeLogin />},
      { path: 'contact-form', element: <Contact />},
      { path: 'messages', element: <Messages />},
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
