import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "../../frontend/src")));

app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/src/index.html"));
});

export default app;
