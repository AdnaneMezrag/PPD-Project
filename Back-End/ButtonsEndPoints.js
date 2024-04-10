const express = require("express");

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());


router.get("/", (req, res) => {
    res.json({"Users":["User1","User2","User3"]});
});

function isHeartRateOk(CurrentHeartRate){
    if(CurrentHeartRate <= 100 && CurrentHeartRate >= 60){
        return "Good";
    }
    return "Bad";
}

router.post("/HeartRate",(req,res)=>{
    const {heartRate} = req.body;
    const HeartRateResult = isHeartRateOk(heartRate);
    console.log("Data sent successfuly")
    res.json({message:HeartRateResult});

})

module.exports = router;