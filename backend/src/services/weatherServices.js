import axios from "axios";
import { ENV } from "../config/env.js";

export const getWeatherData = async (city) => {
  const apiKey = ENV.WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const { data } = await axios.get(url);

  return data;
};
