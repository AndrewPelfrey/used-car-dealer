import { useState, useEffect } from "react";
import "../styles/carSearch.css";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuel_eco_city: number;
  fuel_eco_highway: number;
  image_url_1?: string;
  description?: string;
}

const CarSearch = () => {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [searchCriteria, setSearchCriteria] = useState({
    make: "",
    model: "",
    priceRange: "",
    mileage: "",
    fuelEco: "",
  });

  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  // Fetch Makes
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("/api/cars");
        const data: { make: string }[] = await response.json();
        const uniqueMakes = [...new Set(data.map((item) => item.make))];
        setMakes(uniqueMakes);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchMakes();
  }, []);

  // Fetch Models based on selected Make
  useEffect(() => {
    if (searchCriteria.make) {
      const fetchModels = async () => {
        try {
          const response = await fetch(`/api/cars?make=${searchCriteria.make}`);
          const data = await response.json();
          const filteredModels = data
            .filter((car: { make: string }) => car.make === searchCriteria.make)
            .map((car: { model: string }) => car.model);
          setModels(filteredModels);
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      };

      fetchModels();
    } else {
      setModels([]);
    }
  }, [searchCriteria.make]);

  // Helper function to check if the car's value is within a range
  const isInRange = (value: number, range: string) => {
    if (!range) return true; // If no range is set, don't filter by it.
    const [min, max] = range.split("-").map(Number);
    return value >= min && value <= max;
  };

  // Filter cars based on criteria (Including price, mileage, fuel economy)
  useEffect(() => {
    const filterCars = async () => {
      const { make, model, priceRange, mileage, fuelEco } = searchCriteria;

      try {
        // Fetch all cars from the API
        const response = await fetch("/api/cars");
        const data: Car[] = await response.json();

        if (!response.ok) {
          alert("Error fetching cars.");
          return;
        }

        // Filter based on Make and Model
        const filtered = data.filter((car) => {
          const isMakeMatch = make ? car.make === make : true;
          const isModelMatch = model ? car.model === model : true;
          const isPriceMatch = isInRange(car.price, priceRange);
          const isMileageMatch = isInRange(car.mileage, mileage);
          const isFuelEcoMatch = fuelEco
            ? (isInRange(car.fuel_eco_city, fuelEco) ||
                isInRange(car.fuel_eco_highway, fuelEco))
            : true;

          return (
            isMakeMatch &&
            isModelMatch &&
            isPriceMatch &&
            isMileageMatch &&
            isFuelEcoMatch
          );
        });

        setFilteredCars(filtered);
      } catch (error) {
        console.error("Error searching cars:", error);
      }
    };

    filterCars();
  }, [searchCriteria]); // Trigger this effect when any search criteria change

  // Handle search form changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="car-search-container">
      <h1>Car Search</h1>

      <div className="search-criteria">
        <form>
          <label>
            Make:
            <select
              name="make"
              value={searchCriteria.make}
              onChange={handleChange}
            >
              <option value="">Select Make</option>
              {makes.map((make, idx) => (
                <option key={idx} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </label>

          <label>
            Model:
            <select
              name="model"
              value={searchCriteria.model}
              onChange={handleChange}
              disabled={!searchCriteria.make}
            >
              <option value="">Select Model</option>
              {models.map((model, idx) => (
                <option key={idx} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>

          <label>
            Price Range:
            <select
              name="priceRange"
              value={searchCriteria.priceRange}
              onChange={handleChange}
            >
              <option value="">Select Price Range</option>
              <option value="0-2999">$0 - $2,999</option>
              <option value="3000-4999">$3,000 - $4,999</option>
              <option value="5000-8999">$5,000 - $8,999</option>
              <option value="9000-11999">$9,000 - $11,999</option>
              <option value="12000-14999">$12,000 - $14,999</option>
              <option value="15000-20000">$15,000 - $20,000</option>
              <option value="20000-25000">$20,000 - $25,000</option>
              <option value="25000-30000">$25,000 - $30,000</option>
              <option value="30000-40000">$30,000 - $40,000</option>
              <option value="40000-50000">$40,000 - $50,000</option>
              <option value="50000-60000">$50,000 - $60,000</option>
              <option value="60000+">$60,000+</option>
            </select>
          </label>

          <label>
            Mileage:
            <select
              name="mileage"
              value={searchCriteria.mileage}
              onChange={handleChange}
            >
              <option value="">Select Mileage Range</option>
              <option value="0-10000">0 - 10,000 miles</option>
              <option value="10000-20000">10,000 - 20,000 miles</option>
              <option value="20000-30000">20,000 - 30,000 miles</option>
              <option value="30000-40000">30,000 - 40,000 miles</option>
              <option value="40000-50000">40,000 - 50,000 miles</option>
              <option value="50000-60000">50,000 - 60,000 miles</option>
              <option value="60000-70000">60,000 - 70,000 miles</option>
              <option value="70000-80000">70,000 - 80,000 miles</option>
              <option value="80000-90000">80,000 - 90,000 miles</option>
              <option value="90000-100000">90,000 - 100,000 miles</option>
              <option value="100000-150000">100,000 - 150,000 miles</option>
              <option value="150000-200000">150,000 - 200,000 miles</option>
              <option value="200000-250000">200,000 - 250,000 miles</option>
              <option value="250000-300000">250,000 - 300,000 miles</option>
              <option value="300000+">300,000+ miles</option>
            </select>
          </label>

          <label>
            Fuel Economy (MPG):
            <select
              name="fuelEco"
              value={searchCriteria.fuelEco}
              onChange={handleChange}
            >
              <option value="">Select Fuel Economy Range</option>
              <option value="0-15">0 - 15 MPG</option>
              <option value="15-21">15 - 21 MPG</option>
              <option value="21-26">21 - 26 MPG</option>
              <option value="26-30">26 - 30 MPG</option>
              <option value="30-35">30 - 35 MPG</option>
              <option value="35-45">35 - 45 MPG</option>
              <option value="45+">45+ MPG</option>
            </select>
          </label>

          <button type="button">Search</button>
        </form>
      </div>

      <div className="search-results">
        {filteredCars.length === 0 ? (
          <p>No cars match this search</p>
        ) : (
          filteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img
                src={car.image_url_1 || "/default-image.jpg"}
                alt={car.model}
              />
              <h2>{car.make} {car.model} ({car.year})</h2>
              <p>{car.description}</p>
              <p>Price: ${car.price}</p>
              <p>Mileage: {car.mileage} miles</p>
              <p>Fuel Economy: {car.fuel_eco_city} city / {car.fuel_eco_highway} highway MPG</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarSearch;
