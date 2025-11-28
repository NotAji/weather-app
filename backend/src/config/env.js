import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
};
