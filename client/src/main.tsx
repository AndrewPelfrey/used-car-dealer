import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import CarSearch from './components/CarSearch.tsx';
import Terms from './pages/Terms.tsx';
import EmployeeLogin from './pages/EmployeeLogin.tsx';
import Contact from './pages/ContactForm.tsx';
import Messages from './pages/Messages.tsx';
import AboutUs from './pages/AboutUs.tsx';
import CrudCars from './pages/CrudCars.tsx';
import CrudEmployees from './pages/CrudEmployees.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import ServiceDepartment from './pages/ServiceDepartment.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },
      { path: 'car-search', element: <CarSearch /> },
      { path: 'terms', element: <Terms />},
      { path: 'employee-login', element: <EmployeeLogin />},
      { path: 'contact-form', element: <Contact />},
      { path: 'messages', element: <Messages />},
      { path: 'about-us', element: <AboutUs />},
      { path: 'service-department', element: <ServiceDepartment />},
      { path: 'crud-cars', element: ( <ProtectedRoute><CrudCars/></ProtectedRoute>),},
      { path: 'crud-employees', element: ( <ProtectedRoute requiredRole="manager"><CrudEmployees/></ProtectedRoute>),},
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
