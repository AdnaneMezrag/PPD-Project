const expres = require("express");
const route = expres.Router();

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

route.post("/heart_rate_history", async (req, res) => {
  const idUser = req.body.idUser;
  const date = req.body.date;

  try {
    const result = await client.query(
      "SELECT * FROM heartratehistory WHERE DATE(datetime) = $1 AND patientid = $2",
      [date, idUser]
    );

    const searched = result.rows.map((row) => ({
      // sending data without the ID (Already has it)
      currentvalue: row.currentheartrate,
      datetime: row.datetime,
      result: row.result,
    }));

    res.json({ searched });
  } catch (error) {
    console.error("Error fetching heart rate history:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.end();
    console.log("Disconnected from the DB");
  }
});

route.post("/blood_sugar_history", async (req, res) => {
  const idUser = req.body.idUser;
  const date = req.body.date;

  // waiting for the blood sugar history to be done first ...

  try {
    const result = await client.query(
      "SELECT * FROM bloodsugarhistory WHERE DATE(datetime) = $1 AND patientid = $2",
      [date, idUser]
    );

    const searched = result.rows.map((row) => ({
      // sending data without the ID (Already has it)
      currentheartrate: row.currentbloodsugar,
      datetime: row.datetime,
      result: row.result,
    }));

    res.json({ searched });
  } catch (error) {
    console.error("Error fetching heart rate history:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.end();
    console.log("Disconnected from the DB");
  }
});

module.exports = route;
