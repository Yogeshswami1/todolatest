import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS (PRODUCTION SAFE)
app.use(
  cors({
    origin: [
      "http://todoo.yogeshtech.xyz",
      "https://todoobackend.yogeshtech.xyz",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight support

app.use(express.json());

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 9000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
