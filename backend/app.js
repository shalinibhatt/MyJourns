const connectDB = require("./config/dbConnect"); // Adjust the path accordingly
connectDB();
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Homepage",
  });
});

// Importing Routes
const todoRoutes = require("./routes/TodoRoutes");
app.use("/", todoRoutes);

module.exports = app;
