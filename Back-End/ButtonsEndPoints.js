const express = require("express");

const router = express.Router();

const HeartRate = {HeartRate:5};


router.get("/", (req, res) => {
    res.json({"Users":["User1","User2","User3"]});
});

function isHeartRateOk(CurrentHeartRate){
    if(CurrentHeartRate <= 100 && CurrentHeartRate >= 60){
        return true;
    }
    return false;
}

router.post("/HeartRate",(req,res)=>{
    isHeartRateOk(req.body);
    console.log("Data sent successfuly")
})

module.exports = router;