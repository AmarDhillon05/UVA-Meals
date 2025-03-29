require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");

const db = require("./config/db");

app.use(cors());

db();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Welcome to the ReviewMfCourse API");
});

app.get("/api/get-meals-info", async (req, res) => {
  console.log("Got a meal request");
  try {
    const menu = mongoose.connection.useDb("hackuva").collection("menu");
    const data = await menu.findOne({});
    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

app.listen(process.env.PORT || 2022, () => {
  console.log(
    "ClassRate servers up and running at Port " + process.env.PORT + ". "
  );
});
