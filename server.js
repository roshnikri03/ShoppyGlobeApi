const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;
db.on("open", () => {
  console.log("Database connected");
});

db.on("error", (err) => {
  console.error("Database connection error:", err);
});