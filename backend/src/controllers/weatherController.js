import { getWeatherData } from "../services/weatherServices.js";

export const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) return res.status(404).json({ message: "Input a city" });

    const data = await getWeatherData(city);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};
