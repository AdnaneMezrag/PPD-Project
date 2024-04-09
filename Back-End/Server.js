const express = require("express");

const app = express();
app.use(express.json()); //almost forgot this



// const cors = require("cors");


// const loginEndPoints = require("./LoginEndpoints");

// app.use(cors());


// app.use("/api/login", loginEndPoints); // using the other file's endpoints via router









//======================================Buttons Logic===============================================

const ButtonsEndPoints = require("./ButtonsEndPoints");
app.use("/api", ButtonsEndPoints); // using the other file's endpoints via router


const Port = process.env.Port || 4000;

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})

