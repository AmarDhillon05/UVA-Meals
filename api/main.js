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

// User routes
const User = require("./models/user.model.js");
const bcrypt = require("bcrypt");

app.post("/api/users/create", async (req, res) => {
  try {
    if (req.body.username && req.body.password) {
      let password = await bcrypt.hash(req.body.password, 3);
      const body = {
        username: req.body.username,
        password,
      };

      const user = await User.create(body);
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/users/login", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(404).json({ error: "user cannot be found" });

    if (req.body.username && req.body.password) {
      if (!bcrypt.compare(req.body.password, user.password))
        return res.status(403).json({ error: "unauthorized access" });
      else {
        res.status(200).json({ user, success: true });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/users/update", async (req, res) => {
  try {
    let user = await findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json({ user, success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Meals routes

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
