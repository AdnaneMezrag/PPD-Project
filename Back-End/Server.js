const express = require("express");

const app = express();
app.use(express.json()); //almost forgot this
const Port = process.env.Port || 4000;
const loginEndPoints = require("./LoginEndpoints");
const signipEndPoints = require("./SignupEndpoints");
app.use(cors());

//==============================LOG and SIGN logic=================================================

app.use("/api/login", loginEndPoints); // using the other file's endpoints via router to login and recieve full user data
app.use("/api/signup", signipEndPoints); // using the other file's endpoints via router to singup and add full user data

//======================================Buttons Logic===============================================

const ButtonsEndPoints = require("./ButtonsEndPoints");
app.use("/api", ButtonsEndPoints); // using the other file's endpoints via router

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
