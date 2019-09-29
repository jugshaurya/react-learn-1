const express = require("express");
const mongoose = require("mongoose");

const app = express();

const registerRoute = require("./routes/registerUser");
const loginRoute = require("./routes/loginUser");

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/rememberMyMovies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to DB..."))
  .catch(err => console.log(err, "Not Connected to DB..."));

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);

const port = process.env.PORT || 4000;
app.listen(port, (req, res) => {
  console.log(`Listening on Port ${port}`);
});
