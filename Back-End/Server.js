const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json()); //almost forgot this

const loginEndPoints = require("./LoginEndpoints");
const signipEndPoints = require("./SignupEndpoints");

app.use(cors());

const Port = process.env.Port || 4000;

app.use("/api/login", loginEndPoints); // using the other file's endpoints via router to login and recieve full user data

app.use("/api/signup", signipEndPoints); // using the other file's endpoints via router to singup and add full user data

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
