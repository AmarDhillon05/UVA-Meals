const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: false,
  },
  protein: {
    type: Number,
    required: false,
  },
  calorie_goals: {
    type: Number,
    required: false,
  },
  protein_goals: {
    type: Number,
    required: false,
  },
  restriction: {
    type: String,
    required: false,
  },
  allergies: {
    type: Array,
    required: false,
  },
});

module.exports = model("users", userSchema);
