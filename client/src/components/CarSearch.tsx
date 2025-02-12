import React, { useState, useEffect } from "react";
import CarForm from "./CarForm";
import CarList from "./CarList";
import { Car } from "../interfaces/Car";
import { fetchCars } from "../api/API";

const CarSearch: React.FC = () => {
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch all cars on initial render
  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars("", "", ""); // Fetch all cars
        if (data.length === 0) {
          setError("No cars found.");
        } else {
          setCars(data);
        }
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to fetch cars. Please try again later.");
      }
    };

    loadCars();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error before searching
  
    try {
      const data = await fetchCars(make, model, year);
      console.log("Fetched cars:", data); // Debugging log
  
      if (!data || data.length === 0) {
        setError("No cars found.");
        setCars([]); // Ensure cars list is cleared
      } else {
        setCars(data);
      }
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to fetch cars. Please try again later.");
    }
  };
  

  return (
    <div>
      <h1>Car Search</h1>
      <CarForm 
        make={make} setMake={setMake} 
        model={model} setModel={setModel} 
        year={year} setYear={setYear} 
        onSearch={handleSearch} 
      />
      <CarList cars={cars} error={error} />
    </div>
  );
};

export default CarSearch;



