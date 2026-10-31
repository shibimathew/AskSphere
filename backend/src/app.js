import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documentRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/documents", documentRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AskSphere API is running",
    status: "healthy",
  });
});

export default app;