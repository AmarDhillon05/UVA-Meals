const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB database is up.");
  } catch (e) {
    console.log("There was an error: " + e.message);
  }
};

module.exports = connect;
