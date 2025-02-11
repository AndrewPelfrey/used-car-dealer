
import React from "react";
import { CarFormProps } from "../interfaces/CarFormProps";

const CarForm: React.FC<CarFormProps> = ({ make, setMake, model, setModel, year, setYear, onSearch }) => {
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
      <button type="submit">Search</button>
    </form>
  );
};

export default CarForm;


