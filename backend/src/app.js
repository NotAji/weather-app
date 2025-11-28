import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.send("Weather API is running...");
});

export default app;
