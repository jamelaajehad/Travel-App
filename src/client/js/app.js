// Fetch coordinates using Geonames API
async function fetchCoordinates(city) {
  try {
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=jamela.jehad`);
    const data = await response.json();

    console.log("Geonames API Response:", data);

    if (!data.geonames || data.geonames.length === 0) {
      throw new Error("No results found for this city.");
    }

    return {
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
    };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw new Error("Please try again, something went wrong while fetching coordinates.");
  }
}

// Fetch weather data using Weatherbit API
async function fetchWeather(latitude, longitude, travelDate) {
  try {
    const WEATHER_API_KEY = "229ee8f4d11a4becb352839f131a563f";
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`);
    const data = await response.json();

    console.log("Weatherbit API Response:", data);

    if (!data.data || data.data.length === 0) {
      throw new Error("No weather data found for this location.");
    }

    return data.data[0];
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Failed to fetch weather data. Please try again.");
  }
}

// Fetch image using Pixabay API
async function fetchImage(cityName) {
  try {
    const IMAGE_API_KEY = "48879614-78b92de059bfff3be17595e2b";
    const response = await fetch(`https://pixabay.com/api/?key=${IMAGE_API_KEY}&q=${encodeURIComponent(cityName)}&image_type=photo`);
    const data = await response.json();

    console.log("Pixabay API Response:", data);

    if (!data.hits || data.hits.length === 0) {
      throw new Error("No image found for the city.");
    }

    return data.hits[0].webformatURL;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Failed to fetch an image. Please try again.");
  }
}

// Handle form submission and display results
async function handleFormSubmit(event) {
  event.preventDefault();
  const cityName = document.getElementById('destination').value;
  const travelDate = document.getElementById('departure-date').value;

  const resultSection = document.getElementById('results');
  resultSection.innerHTML = "<p>Loading...</p>";

  try {
    // Fetch coordinates, weather, and image
    const { latitude, longitude } = await fetchCoordinates(cityName);
    const weatherData = await fetchWeather(latitude, longitude, travelDate);
    const cityImage = await fetchImage(cityName);

    // Display results
    resultSection.innerHTML = `
      <h2>${cityName}</h2>
      <img src="${cityImage}" alt="${cityName}" style="max-width: 100%; height: auto;">
      <p>Weather: ${weatherData.weather.description}</p>
      <p>Temperature: ${weatherData.temp}°C</p>
       
    `;
  } catch (error) {
    resultSection.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}




document.getElementById('travel-form').addEventListener('submit', handleFormSubmit);  // Event listener for form submission
