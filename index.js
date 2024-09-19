// index.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to cnctd!");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`cnctd server running on port ${PORT}`);
});