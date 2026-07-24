import "dotenv/config";
import express from "express";
import cors from "cors";

import eventRoutes from "./routes/event.routes";
import entityRoutes from "./routes/entity.routes";
import recommendationRoutes from "./routes/recommendation.routes";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRoutes);
app.use("/entities", entityRoutes);
app.use("/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AI Personalization Platform API Running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});