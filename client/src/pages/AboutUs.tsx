import React from "react";
import "../styles/aboutUs.css"; // Create this stylesheet for styling

const AboutUs: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <img src="/images/icons/autoscoutLogo.png" alt="AutoScout Logo" className="page-logo" />
        <h1>About AutoScout</h1>
        <p>
        Welcome to <strong>AutoScout</strong>, a family-run used car dealership
        that has been serving our community since 2018. Founded by a father and
        son duo with a deep passion for the mechanics and beauty of vehicles, we
        take pride in offering a handpicked selection of quality used cars.
        </p>
        <p>
        At AutoScout, we keep a small inventory of around 20-30 cars, ensuring
        that each vehicle meets our high standards. Whether you're looking for a
        reliable daily driver or a unique ride with character, we are here to
        help you find the perfect car.
        </p>
        <p>
        Our goal is simple: to provide honest service, fair prices, and
        well-maintained vehicles to our customers. Feel free to visit us and
        experience the AutoScout difference!
        </p>

        <div className="business-info">
          <h2>Our Dealership</h2>
          <p><strong>Address:</strong> 1234 Placeholder St, Anytown, USA</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>

          <h2>Business Hours</h2>
          <ul>
            <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
            <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
            <li><strong>Sunday:</strong> Closed</li>
          </ul>
        </div>
        
        <button onClick={() => (window.location.href = "/contact-form")} className="contact-button">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
