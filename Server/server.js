import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import dotenv from 'dotenv'
dotenv.config()



app.use(cors({
  origin: 'http://todo.yogeshtech.xyz',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));app.use(express.json());app.use(express.json())

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 9000

connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
