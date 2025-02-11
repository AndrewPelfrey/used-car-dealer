import React from "react";
import { Link } from "react-router-dom";
import { Car } from "../interfaces/Car";

interface CarListProps {
  cars: Car[];
  error: string;
}

const CarList: React.FC<CarListProps> = ({ cars, error }) => {
  if (error) return <p>{error}</p>;
  if (!cars.length) return <p>No cars found.</p>;

  return (
    <ul>
      {cars.map((car) => (
        <li key={car.id}>
          <Link to={`/car/${car.id}/${encodeURIComponent(car.make)}/${encodeURIComponent(car.model)}/${car.year}`}>
            {car.year} {car.make} {car.model}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CarList;


