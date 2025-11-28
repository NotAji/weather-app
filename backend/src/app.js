import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend/src")));

app.use("/api/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.send("Weather API is running...");
});

export default app;
