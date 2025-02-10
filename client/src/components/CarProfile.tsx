import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Car } from "../interfaces/Car";

const API_URL = import.meta.env.VITE_API_BASE_URL; 

const CarProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`${API_URL}/cars/${id}`); 
        if (!response.ok) {
          throw new Error(`Car not found (Status: ${response.status})`);
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Car not found or failed to fetch.");
      }
    };

    if (id) {
      fetchCar();
    } else {
      setError("Invalid car ID.");
    }
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <h2>{car.year} {car.make} {car.model}</h2>
      <p><strong>ID:</strong> {car.id}</p>
      <p><strong>Make:</strong> {car.make}</p>
      <p><strong>Model:</strong> {car.model}</p>
      <p><strong>Year:</strong> {car.year}</p>
    </div>
  );
};

export default CarProfile;

