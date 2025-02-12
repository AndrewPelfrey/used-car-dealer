import { NavLink } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <img src="/images/preview/corvetteInterior.png" alt="Car Interior" className="hero-image" />
        <div className="hero-text">Experience your journey in something you can remember.</div>
        <NavLink to="/car-search" className="inventory-button">View Inventory</NavLink>
      </div>

      {/* Featured Vehicles Section */}
      <section className="featured-vehicles">
        <h2>Featured Vehicles</h2>
        <div className="vehicle-card-container">
          {[...Array(5)].map((_, index) => (
            <div className="vehicle-card" key={index}>
              {/* Code here should be replaced with values that reference the car id being shown. */}
              {/* Would likely need to also add a reference that pulls the primary image of a car to be shown as well. */}
              <div className="price-bar">$XX,XXX</div>
              <div className="vehicle-details">
                <h3>Year Make Model</h3>
                <p>Mileage: XX,XXX miles</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Services Section */}
      <section className="other-services">
        <h2>Other Services We Provide</h2>
        <div className="service-card-container">
          <NavLink to="/service-department" className="service-card">
            <img src="/images/preview/engine.png" alt="Service Department" />
            <div className="service-text">Service Department</div>
          </NavLink>
          <div className="service-card-container">
            <NavLink to="/contact-form" className="service-card">
              <img src="/images/preview/dented-car.jpg" alt="Vehicle Trading" />
              <div className="service-text">Vehicle Trading</div>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
