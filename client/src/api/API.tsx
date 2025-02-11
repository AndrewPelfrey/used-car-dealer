const API_URL = '/api/cars';  // Use the relative API URL instead of the full base URL

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
      const errorText = await response.text();
      throw new Error(`Failed to fetch cars: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching cars:", err);
    throw err;
  }
};

