import React from "react";
import { Link } from "react-router-dom";
import { Car } from "../interfaces/Car";
import "../styles/carSearch.css";

interface CarListProps {
  cars: Car[];
  error: string;
}

const CarList: React.FC<CarListProps> = ({ cars, error }) => {
  if (error) return <p className="text-red-500">{error}</p>;
  if (!cars.length) return <p>No cars found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => (
        <div key={car.id} className="border rounded-lg shadow-md p-4 bg-white">
          {/* Car Images */}
          <div className="mb-2">
            {car.image_url_1 ? (
              <img src={car.image_url_1} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover rounded-md" />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
                No Image Available
              </div>
            )}
          </div>

          {/* Car Title */}
          <h2 className="text-lg font-semibold">
            <Link to={`/car/${car.id}/${encodeURIComponent(car.make)}/${encodeURIComponent(car.model)}/${car.year}`} className="text-blue-600 hover:underline">
              {car.year} {car.make} {car.model}
            </Link>
          </h2>

          {/* Car Details */}
          <p><strong>Price:</strong> ${car.price || "N/A"}</p>
          <p><strong>Mileage:</strong> {car.mileage || "N/A"} miles</p>
          <p><strong>Engine:</strong> {car.engine || "N/A"}</p>
          <p><strong>Transmission:</strong> {car.transmission || "N/A"}</p>
          <p><strong>Interior Color:</strong> {car.interior_color || "N/A"}</p>
          <p><strong>Exterior Color:</strong> {car.exterior_color || "N/A"}</p>
          <p><strong>Fuel Efficiency:</strong> {car.fuel_eco_city || "N/A"} MPG city / {car.fuel_eco_highway || "N/A"} MPG highway</p>

          {/* Description */}
          {car.description && <p className="mt-2 text-gray-700">{car.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default CarList;
