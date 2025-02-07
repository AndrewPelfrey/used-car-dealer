import React, { useState } from "react";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
}

const CarSearch: React.FC = () => {
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/cars?make=${make}&model=${model}&year=${year}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();
      setCars(data);
      setError("");
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to fetch cars. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Car Search</h1>

      <form onSubmit={handleSearch}>
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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h2>Search Results</h2>
        {cars.length > 0 ? (
          <ul>
            {cars.map((car) => (
              <li key={car.id}>
                {car.make} {car.model} ({car.year})
              </li>
            ))}
          </ul>
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default CarSearch;
