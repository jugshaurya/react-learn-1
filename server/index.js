const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Aur Kaise hai BAI");
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`Listening on Port ${port}`);
});
