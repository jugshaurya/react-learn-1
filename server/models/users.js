const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

// create a Schema and then a Collection out of it
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

const Users = mongoose.model("Users", usersSchema);

const validate = data => {
  const validSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    password: Joi.string().required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      })
      .required()
  });

  return validSchema.validate(data);
};

module.exports = {
  Users,
  validate
};
