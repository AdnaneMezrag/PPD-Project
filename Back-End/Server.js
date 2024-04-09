const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json()); //almost forgot this

const loginEndPoints = require("./LoginEndpoints");

app.use(cors());

const Port = process.env.Port || 4000;

app.use("/api/login", loginEndPoints); // using the other file's endpoints via router

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
