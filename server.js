const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json()); //almost forgot this
const Port = process.env.PORT || 4000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

//==============================LOG and SIGN logic=================================================
const loginEndPoints = require("./LoginEndpoints");
const signipEndPoints = require("./SignupEndpoints");
app.use("/api/login", loginEndPoints.router); // using the other file's endpoints via router to login and recieve full user data
app.use("/api/signup", signipEndPoints); // using the other file's endpoints via router to singup and add full user data
//==============================LOG and SIGN logic=================================================

const historyEndpoints = require("./HistorySearch");
app.use("/api/history", historyEndpoints);

//======================================Buttons Logic===============================================
const ButtonsEndPoints = require("./ButtonsEndPoints");
app.use("/api", ButtonsEndPoints); // using the other file's endpoints via router

//======================================Buttons Logic===============================================

const stat = require("./Stats");
app.use("/api/stat", stat); // using the other file's endpoints via router



app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
