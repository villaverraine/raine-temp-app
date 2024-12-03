// app.js

import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"; // Import Auth Routes

// Constants
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// Create Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({status: "Server is up and running"})
})

// Register Routes
app.use("/api", require("./routes/authRoutes")); // Auth routes

// Database Connection
async function connectDatabase() {
  const uri = process.env.URI;
  try {
    await mongoose.connect(uri, { dbName: "AWSTicketApp" }, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1); // Exit process on DB failure
  }
}

connectDatabase();

module.exports = app;
