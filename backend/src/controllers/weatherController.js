import { getWeatherData } from "../services/weatherServices.js";

export const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) return res.status(404).json({ message: "Input a city" });

    const data = await getWeatherData(city);

    res.json(data);
  } catch (error) {
    const errorData = error.response?.data || {
      cod: 500,
      message: "Server error",
    };
    res.status(error.response?.status || 500).json(errorData);
  }
};
