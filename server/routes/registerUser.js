const express = require("express");
const bcrypt = require("bcrypt");
const route = express.Router();

// Getting User Collection
const { Users, validate } = require("../models/users.js");

const generateHashedPassword = async function(pass) {
  const saltRounds = process.env.saltRounds;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPass = await bcrypt.hash(pass, salt);
  return hashedPass;
};

route.post("/", async (req, res) => {
  // TODO: Validate the body return 400 if not Valid else proceed...
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  // find out if user is already present in db by email or username
  // if yes return user is already registered
  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email already Registered");
  user = await Users.findOne({ username: req.body.username });
  if (user) return res.status(400).send("Username already taken");

  const hashedPass = await generateHashedPassword(req.body.password);
  // else create an account
  user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass
  });

  await user.save();
  // return account created
  res.send({
    _id: user._id,
    username: user.username,
    email: user.email
  });
});

module.exports = route;
