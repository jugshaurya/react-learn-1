const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const route = express.Router();
const { Users, validate } = require("../models/users.js");

const generateHashedPassword = async function(pass) {
  const saltRounds = parseInt(process.env.SALT_ROUND);
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPass = await bcrypt.hash(pass, salt);
  return hashedPass;
};

route.post("/", async (req, res) => {
  // TODO: Validate the body return 400 if not Valid else proceed...
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.message);
  // find out if user is already present in db by email or username
  // if yes return user is already registered
  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).json("Email already Registered");
  user = await Users.findOne({ username: req.body.username });
  if (user) return res.status(400).json("Username already taken");

  const hashedPass = await generateHashedPassword(req.body.password);

  // else create an account
  user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass
  });

  const payload = { _id: user._id, username: user.username };
  const jwtPrivateKey = process.env.jwtPrivateKey;
  if (!jwtPrivateKey) {
    console.log("JWT key not available");
    return res.status(500).json("Server Error");
  }

  await user.save();
  const token = jwt.sign(payload, jwtPrivateKey, { expiresIn: "1m" });

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: token
  });
});

module.exports = route;
