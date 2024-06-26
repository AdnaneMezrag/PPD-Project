const express = require("express");

const bodyParser = require("body-parser");

const router = express.Router();

const { Client } = require("pg");

const client = new Client({
  // the values here will be changed accordingly to the final product

  host: "c9pbiquf6p6pfn.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com",
  password: "pe859e1c606cfae38101c2f70e7b5996e2ae6b44367363b9ff7bce340e7929f23",
  user: "ueptonfqkg1j4t",
  database: "dfbnm5dtqvaptt",
  port: "5432",

  ssl: {
    rejectUnauthorized: false,
  },

  // host: "localhost",
  // password: "123",
  // user: "postgres",
  // database: "ppd",
  // port: "5432",
});

client.connect();
const { getUserInformationToExport } = require("./LoginEndpoints");
router.use(bodyParser.json());

// router.get("/", (req, res) => {
//     res.json({"Users":["User1","User2","User3"]});
// });

//Geting User Information From LoginEndPoints.js
// async function getUser(){
//     (async () => {
//         try {
//           // Call getUserInformationToExport function to retrieve user information
//           const user = await getUserInformationToExport();

//           // Access user ID
//         console.log("User ID:", user.id);
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       })();
// }

async function saveHeartRateResultInDB(HeartRate, HeartRateResult) {
  (async () => {
    try {
      // Call getUserInformationToExport function to retrieve user information
      const user = await getUserInformationToExport();

      // Access user ID
      insertDataIntoTable(HeartRate, HeartRateResult, user);

      console.log("User ID:", user.id);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
}

async function insertDataIntoTable(HeartRate, HeartRateResult, User) {
  try {
    // Construct the SQL INSERT query
    const query = `
        INSERT INTO heartratehistory (currentheartrate, datetime,patientid ,result)
        VALUES ($1, $2, $3,$4)
        RETURNING *;`;

    const currentTimestamp = new Date();
    //Get User ID

    console.log(HeartRate);
    // Define the values to be inserted
    const values = [HeartRate, currentTimestamp, User.id, HeartRateResult];

    // Execute the query
    const result = await client.query(query, values);

    // Log the inserted row(s)
    console.log("Inserted row:", result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
  } 
}

function isHeartRateOk(CurrentHeartRate) {
  if (CurrentHeartRate <= 100 && CurrentHeartRate >= 60) {
    return "good";
  }
  return "Bad";
}

router.post("/HeartRate", (req, res) => {
  const heartRate = req.body.heartRate;
  const HeartRateResult = isHeartRateOk(heartRate);
  const heartRateInt = parseInt(heartRate);
  console.log(heartRateInt);
  console.log("Data sent successfuly");
  //console.log(getUserInformationToExport.id);
  res.json({ message: HeartRateResult });
  saveHeartRateResultInDB(heartRateInt, HeartRateResult);
});

module.exports = router;
