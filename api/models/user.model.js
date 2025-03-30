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
  protein: {
    type: Number,
    default: 0,
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
