
const API_URL = "http://localhost:5001/api/cars"; 


// Fetch all cars
export const fetchCars = async (make: string, model: string, year: string) => {
  try {
    const response = await fetch(`${API_URL}/cars?make=${make}&model=${model}&year=${year}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching cars:", err);
    throw err;
  }
};

// Fetch a single car by ID
export const fetchCarById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`);
    if (!response.ok) {
      throw new Error("Car not found");
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching car:", err);
    throw err;
  }
};