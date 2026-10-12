import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Feedback from "./models/Feedback.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// POST route
app.post("/feedback", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const newFeedback = new Feedback({
      name,
      rating,
      comment
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback
    });

  } catch (error) {
    res.status(500).json({
      message: "Error submitting feedback",
      error: error.message
    });
  }
});


// GET route
app.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find();

    res.json(feedback);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching feedback",
      error: error.message
    });
  }
});


// Test route
app.get("/", (req, res) => {
  res.send("Student Feedback Manager Backend is running");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});