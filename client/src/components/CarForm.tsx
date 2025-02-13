import React from "react";
import { CarFormProps } from "../interfaces/CarFormProps";

const CarForm: React.FC<CarFormProps> = ({
  make, setMake,
  model, setModel,
  year, setYear,
  mileage, setMileage,
  engine, setEngine,
  transmission, setTransmission,
  interior_color, setInteriorColor,
  exterior_color, setExteriorColor,
  description, setDescription,
  fuel_eco_highway, setFuelEcoHighway,
  fuel_eco_city, setFuelEcoCity,
  price, setPrice,
  image_url_1, setImageUrl1,
  image_url_2, setImageUrl2,
  onSearch
}) => {
  return (
    <form onSubmit={onSearch}>
      <div>
        <label htmlFor="make">Make:</label>
        <input type="text" id="make" value={make} onChange={(e) => setMake(e.target.value)} />
      </div>

      <div>
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
      </div>

      <div>
        <label htmlFor="year">Year:</label>
        <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>

      <div>
        <label htmlFor="mileage">Mileage:</label>
        <input type="number" id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} />
      </div>

      <div>
        <label htmlFor="engine">Engine:</label>
        <input type="text" id="engine" value={engine} onChange={(e) => setEngine(e.target.value)} />
      </div>

      <div>
        <label htmlFor="transmission">Transmission:</label>
        <input type="text" id="transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)} />
      </div>

      <div>
        <label htmlFor="interior_color">Interior Color:</label>
        <input type="text" id="interior_color" value={interior_color} onChange={(e) => setInteriorColor(e.target.value)} />
      </div>

      <div>
        <label htmlFor="exterior_color">Exterior Color:</label>
        <input type="text" id="exterior_color" value={exterior_color} onChange={(e) => setExteriorColor(e.target.value)} />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label htmlFor="fuel_eco_highway">Fuel Economy (Highway):</label>
        <input type="number" id="fuel_eco_highway" value={fuel_eco_highway} onChange={(e) => setFuelEcoHighway(e.target.value)} />
      </div>

      <div>
        <label htmlFor="fuel_eco_city">Fuel Economy (City):</label>
        <input type="number" id="fuel_eco_city" value={fuel_eco_city} onChange={(e) => setFuelEcoCity(e.target.value)} />
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div>
        <label htmlFor="image_url_1">Image URL 1:</label>
        <input type="text" id="image_url_1" value={image_url_1} onChange={(e) => setImageUrl1(e.target.value)} />
      </div>

      <div>
        <label htmlFor="image_url_2">Image URL 2:</label>
        <input type="text" id="image_url_2" value={image_url_2} onChange={(e) => setImageUrl2(e.target.value)} />
      </div>

      <button type="submit">Search</button>
    </form>
  );
};

export default CarForm;
