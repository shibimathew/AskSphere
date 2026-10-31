import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AskSphere API is running",
    status: "healthy",
  });
});

export default app;