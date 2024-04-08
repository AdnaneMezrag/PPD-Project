const express = require('express');
const app = express();

const Port = process.env.Port || 4000;

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(Port,()=>{
    console.log(`Server running on port ${Port}`);
})