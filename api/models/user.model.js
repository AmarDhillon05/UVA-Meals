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
    default: 0,
  },
  weight: {
    type: Number,
    default: 150,
  },
  goal: {
    type: Number,
    default: 150,
  },
  protein: {
    type: Number,
    default: 0,
  },
  calorie_goals: {
    type: Number,
    default: 2000,
  },
  protein_goals: {
    type: Number,
    default: 80,
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
