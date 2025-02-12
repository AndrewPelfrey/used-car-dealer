import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/service-department.css";

const ServiceDepartment: React.FC = () => {
  return (
    <div className="service-department-container">
      <h1>Service Department</h1>
      <p>
        Our expert technicians provide top-quality maintenance and repair services to keep your vehicle running
        smoothly. Whether you need routine maintenance or complex repairs, we offer a full range of services, including:
      </p>
      <ul>
        <li>Oil Change</li>
        <li>Brakes</li>
        <li>Alignments</li>
        <li>Struts</li>
        <li>A/C Refill</li>
        <li>Batteries</li>
        <li>Tune-Ups</li>
        <li>Cooling Systems</li>
        <li>Suspension</li>
        <li>Steering</li>
        <li>Alternator</li>
        <li>Hoses & Belts</li>
        <li>Computer Diagnostics</li>
      </ul>
      <h2>We Service the Following Makes:</h2>
      <p>
        Chevrolet, Crystler, Dodge, Ford, GMC, Honda, Hyundai, Lexus, Nissan, RAM, Toyota
      </p>
      <h2>You can call us at (123) 456-7890 <u><NavLink to="/contact-form" className="inquiry-link">or make an inquiry here!</NavLink></u></h2>
    </div>
  );
};

export default ServiceDepartment;
