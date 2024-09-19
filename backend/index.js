const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS for all routes

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});