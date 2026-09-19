import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

import express from "express";
import mongoose from "mongoose";
import Feedback from "./models/Feedback.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));


// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongoose connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });


// POST - Save feedback
app.post("/feedback", async (req, res) => {
    try {
        const { name, rating, comment } = req.body;

        const feedback = new Feedback({
            name,
            rating,
            comment
        });

        await feedback.save();

        res.status(201).json({
            message: "Feedback saved successfully",
            feedback
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to save feedback",
            error: error.message
        });
    }
});


// GET - Get all feedback
app.get("/feedback", async (req, res) => {
    try {
        const feedbacks = await Feedback.find();

        res.status(200).json(feedbacks);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch feedback",
            error: error.message
        });
    }
});


// Open frontend
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/feedback.html")
    );
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});