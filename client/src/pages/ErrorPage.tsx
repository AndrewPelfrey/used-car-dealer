import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

function ErrorPage() {
  return (
    <section>
      <>
      <Nav />
      <h1>404: Page Not Found</h1>
      <h1> ¯\_(ツ)_/¯</h1>
      <Link to="/">Return Home</Link>
      </>
    </section>
  );
}

export default ErrorPage;
