import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CarSearch: React.FC = () => {
  const location = useLocation();
  // This line assumes the variables gotten from sequelize are in place
  const [cars, setCars] = useState<string>("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const model = queryParams.get("model"); // Extracts "model" from "/car-search?model=ford"
    const year = queryParams.get("year");
    const price = queryParams.get("price");
    const color = queryParams.get("color");

    const queryString = new URLSearchParams({
      ...(model && { model }),
      ...(year && { year }),
      ...(price && { price }),
      ...(color && { color }),
    }).toString();

    fetch(`/api/car-search?${queryString}`) // Send only available parameters
      .then((res) => res.json())
      .then((data) => setCars(JSON.stringify(data)))
      .catch((err) => console.error("Error fetching cars:", err));
  }, [location.search]); // Re-runs if query parameters change

  return (
    <div className="card">
      <h2>Car Search Page</h2>
      <p>Matching Cars: {cars || "No results found"}</p>
      <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/pages/CarSearch.jsx</code> and save to test HMR
          </p>
    </div>
  );
};

export default CarSearch;
