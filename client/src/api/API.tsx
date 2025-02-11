const API_URL = "/api/cars"; // ✅ Relative API URL for client-side requests

export const fetchCars = async (make?: string, model?: string, year?: string) => {
  try {
    const queryParams = new URLSearchParams();
    if (make) queryParams.append("make", make);
    if (model) queryParams.append("model", model);
    if (year) queryParams.append("year", year);

    const url = `${API_URL}?${queryParams.toString()}`;
    console.log("Fetching cars from:", url); // ✅ Debugging log

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      const errorText = await response.text();
      throw new Error(`Failed to fetch cars: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching cars:", err);
    return []; // ✅ Prevent breaking UI when API fails
  }
};



