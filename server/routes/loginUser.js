const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const route = express.Router();
const { Users } = require("../models/users.js");

route.post("/", async (req, res) => {
  console.log(req.body);
  // TODO: Validate the body return 400 if not Valid else proceed...
  const data = {
    username: req.body.username,
    password: req.body.password
  };
  const { error } = validate(data);
  if (error) return res.status(400).json(error.message);

  // find out if user is already present in db by email or username
  // if yes return user is already registered
  const user = await Users.findOne({ username: req.body.username });
  if (!user) return res.status(400).json("Invalid Username or Password");

  const correctPass = await validatePass(user.password, req.body.password);
  if (!correctPass) return res.status(400).json("Invalid Username or Password");

  // generate a token and send it with user response
  const payload = { _id: user._id, username: user.username };
  const jwtPrivateKey = process.env.jwtPrivateKey;
  if (!jwtPrivateKey) {
    console.log("jwt key unavailable");
    return res.status(500).json("Server Error");
  }

  const token = jwt.sign(payload, jwtPrivateKey, { expiresIn: "1d" });
  res.json(token);
});

const validate = data => {
  const validSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    password: Joi.string().required()
  });

  return validSchema.validate(data);
};

const validatePass = async (storedPass, userPass) => {
  const isValid = await bcrypt.compare(userPass, storedPass);
  return isValid;
};

module.exports = route;
