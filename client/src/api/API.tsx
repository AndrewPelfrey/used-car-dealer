const API_URL = "/api/cars"; // ✅ Relative API URL for client-side requests

export const fetchCars = async (searchParams: Record<string, string>) => {
  try {
    const queryParams = new URLSearchParams();

    // Iterate through searchParams and add non-empty values to the query
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value.trim() !== "") {
        queryParams.append(key, value);
      }
    });

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
