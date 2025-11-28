const body = document.body;
const searchBar = document.getElementById("searchBar");
const weatherDetails = document.getElementById("weather-details");

function setWeatherBackground(description) {
  if (description.includes("rain")) {
    body.style.backgroundImage = "url(./assets/images/rainy.jpg)";
  } else if (description.includes("cloudy")) {
    body.style.backgroundImage = "url(./assets/images/cloudy.jpg)";
  } else {
    body.style.backgroundImage = "url(./assets/images/sunny.jpg)";
  }
}

function getWeatherIcon(description) {
  if (description.includes("rain")) return "../assets/icons/rain.png";
  if (description.includes("cloud")) return "../assets/icons/cloud.png";
  return "../assets/icons/sun.png";
}

function getTempIcon(temp) {
  if (temp >= 30) return "../assets/icons/hot.png";
  if (temp <= 15) return "../assets/icons/cold.png";
  return "../assets/icons/mild.png";
}

searchBar.addEventListener("keypress", async (e) => {
  if (e.key !== "Enter") return;

  const city = searchBar.ariaValueMax.trim();
  if (!city) return alert("Enter a City");

  try {
    const res = await fetch(`/api/weather?city=${city}`);
    if (!res.ok) return alert("City not found");

    const data = await res.json();

    setWeatherBackground(data.description);

    const weatherIcon = getWeatherIcon(data.description);
    const tempIcon = getTempIcon(data.temp);

    weatherDetails.innerHTML = `
        <h2>${data.city}</h2>
        <img src="${weatherIcon}" alt"${data.description}">
        <p>
            Temperature: ${data.temp} °C
            ${tempIcon ? `<img src="${tempIcon}" alt="temp icon" />` : ""}
        </p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind: ${data.wind} m/s</p>
        `;

    weatherDetails.classList.remove("show");
    void weatherDetails.offsetWidth;
    weatherDetails.classList.add("show");
  } catch (error) {
    weatherDetails.innerHTML = `<p>${error.message}</p>`;
    weatherDetails.classList.add("show");
  }
});
