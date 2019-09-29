const express = require("express");
const bcrypt = require("bcrypt");
const route = express.Router();
const Joi = require("@hapi/joi");

// Getting User Collection
const { Users } = require("../models/users.js");

const validatePass = async (storedPass, userPass) => {
  const isValid = await bcrypt.compare(userPass, storedPass);
  return isValid;
};

route.post("/", async (req, res) => {
  // TODO: Validate the body return 400 if not Valid else proceed...
  const data = {
    username: req.body.username,
    password: req.body.password
  };
  const { error } = validate(data);
  if (error) return res.status(400).send(error.message);
  // find out if user is already present in db by email or username
  // if yes return user is already registered
  const user = await Users.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("No User Found, Please Register");

  const correctPass = await validatePass(user.password, req.body.password);
  if (!correctPass) return res.status(401).send("Wrong Password");
  return res.send(`Welcome ${user.username}`);
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

module.exports = route;
