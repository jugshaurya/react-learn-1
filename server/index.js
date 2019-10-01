const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
const registerRoute = require("./routes/registerUser");
const loginRoute = require("./routes/loginUser");
const moviesRoute = require("./routes/movies");

require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/rememberMyMovies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to DB..."))
  .catch(err => console.log(err, "Not Connected to DB..."));

app.use("/api/movies", moviesRoute);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);

const port = process.env.PORT || 4000;
app.listen(port, (req, res) => {
  console.log(`Listening on Port ${port}`);
});
