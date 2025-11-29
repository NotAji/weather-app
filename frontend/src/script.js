const body = document.body;
const API_URL = "https://ajinweather.onrender.com";
const searchBar = document.getElementById("searchBar");
const weatherDetails = document.getElementById("weather-details");

function setWeatherBackground(mainWeather, isRaining) {
  if (isRaining || mainWeather.toLowerCase().includes("rain")) {
    body.style.backgroundImage = "url('./assets/images/rainy.jpg')";
  } else if (mainWeather.toLowerCase().includes("cloud")) {
    body.style.backgroundImage = "url('./assets/images/cloudy.jpg')";
  } else {
    body.style.backgroundImage = "url('./assets/images/sunny.jpg')";
  }
}

function getWeatherIcon(mainWeather, isRaining) {
  if (isRaining || mainWeather.toLowerCase().includes("rain"))
    return "./assets/icons/rain.png";
  if (mainWeather.toLowerCase().includes("cloud"))
    return "./assets/icons/clouds.png";
  return "./assets/icons/sun.png";
}

function getTempIcon(tempC) {
  if (tempC >= 30) return "./assets/icons/hot.png";
  if (tempC <= 15) return "./assets/icons/cold.png";
  return "./assets/icons/mild.png";
}

searchBar.addEventListener("keypress", async (e) => {
  if (e.key !== "Enter") return;

  const city = searchBar.value.trim();
  if (!city) {
    weatherDetails.innerHTML = `<p>Please enter a city.</p>`;
    weatherDetails.classList.add("show");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/weather?city=${city}`);

    const data = await res.json();

    if (!res.ok || data.cod === "404") {
      weatherDetails.innerHTML = `
        <h2>City not found</h2>
      `;
      weatherDetails.classList.remove("show");
      void weatherDetails.offsetWidth;
      weatherDetails.classList.add("show");
      console.log(weatherDetails);
      return;
    }

    const mainWeather = data.weather?.[0]?.main ?? "";
    const description = data.weather?.[0]?.description ?? "";
    const tempK = data.main?.temp;
    const tempC = tempK ? (tempK - 273.15).toFixed(1) : "N/A";
    const humidity = data.main?.humidity ?? "N/A";
    const wind = data.wind?.speed ?? "N/A";
    const isRaining = !!data.rain?.["1h"];

    setWeatherBackground(mainWeather, isRaining);

    const weatherIcon = getWeatherIcon(mainWeather, isRaining);
    const tempIcon = getTempIcon(tempC);

    weatherDetails.innerHTML = `
      <h2>${data.name}</h2>
      <div class="weather">
        <img src="${weatherIcon}" alt="${description}" class="weather-icon" />
        <p>${description}</p>
      </div>
      <div class="temperature">
        <img src="${tempIcon}" alt="temp icon" class="temp-icon" />
        <p>Temperature: ${tempC} °C</p>
      </div>
      <div class="humidWind">
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${wind} m/s</p>
      </div>
    `;

    weatherDetails.classList.remove("show");
    void weatherDetails.offsetWidth;
    weatherDetails.classList.add("show");
  } catch (error) {
    weatherDetails.innerHTML = `
      <h2>Error</h2>
      <p>${error.message}</p>
    `;
    weatherDetails.classList.remove("show");
    void weatherDetails.offsetWidth;
    weatherDetails.classList.add("show");
    console.error(error);
    return;
  }
});
