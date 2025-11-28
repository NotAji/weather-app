import axios from "axios";

export const getWeatherData = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const { data } = await axios.get(url);
  return data;
};
