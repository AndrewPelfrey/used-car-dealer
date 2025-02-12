import React, { useState, useEffect } from "react";
import CarForm from "./CarForm";
import CarList from "./CarList";
import { Car } from "../interfaces/Car";
import { fetchCars } from "../api/API";

const CarSearch: React.FC = () => {
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [engine, setEngine] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [interior_color, setInteriorColor] = useState<string>("");
  const [exterior_color, setExteriorColor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fuel_eco_highway, setFuelEcoHighway] = useState<string>("");
  const [fuel_eco_city, setFuelEcoCity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image_url_1, setImageUrl1] = useState<string>("");
  const [image_url_2, setImageUrl2] = useState<string>("");

  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch all cars on initial render
  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars({});
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
  
    const searchParams = {
      make,
      model,
      year,
      mileage,
      engine,
      transmission,
      interior_color,
      exterior_color,
      description,
      fuel_eco_highway,
      fuel_eco_city,
      price,
      image_url_1,
      image_url_2,
    };
  
    try {
      const data = await fetchCars(searchParams);
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
        mileage={mileage} setMileage={setMileage}
        engine={engine} setEngine={setEngine}
        transmission={transmission} setTransmission={setTransmission}
        interior_color={interior_color} setInteriorColor={setInteriorColor}
        exterior_color={exterior_color} setExteriorColor={setExteriorColor}
        description={description} setDescription={setDescription}
        fuel_eco_highway={fuel_eco_highway} setFuelEcoHighway={setFuelEcoHighway}
        fuel_eco_city={fuel_eco_city} setFuelEcoCity={setFuelEcoCity}
        price={price} setPrice={setPrice}
        image_url_1={image_url_1} setImageUrl1={setImageUrl1}
        image_url_2={image_url_2} setImageUrl2={setImageUrl2}
        onSearch={handleSearch} 
      />
      <CarList cars={cars} error={error} />
    </div>
  );
};

export default CarSearch;
