const expres = require("express");

const router = expres.Router();

module.exports = router;

/*
// db

const { Client } = require("pg");

const client = new Client({
  // the values here will be changed accordingly to the final product
  host: "localhost",
  password: "123",
  user: "postgres",
  database: "ppd",
  port: "5432",
});

client.connect();

router.get("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let userMESSAGE;

    const table = (await client.query("SELECT * FROM patients;")).rows;

    //OR use normal query for better performance (TODO)
    // const result = await client.query("SELECT * FROM patients WHERE email = $1 AND password = $2", [email, password]);

    const queryResult = table.find(
      (patient) => patient.email === email && patient.password === password
    );

    if (!queryResult) {
      userMESSAGE = "Could not find the user with the said Carendiatls";
      //     res.status(404).send(userMESSAGE);
      res.json({ userMESSAGE }); // this message shall be used for informing the user in case of wrong
    } else {
      userMESSAGE = "User found...";
      //   res.send(userMESSAGE); only one result shall be sent at a time
      res.json({
        name: queryResult.name,
        id: queryResult.id,
        email: queryResult.email,
        password: queryResult.password,
        gender: queryResult.gender,
        birthday: queryResult.date_of_birth,
        message: userMESSAGE,
      });
    }
  } catch (error) {
    res.send("ERROR");
  }
});


// id |     name      |       email       |    password    | age | gender | date_of_birth
// ----+---------------+-------------------+----------------+-----+--------+---------------
//   1 | John Doe      | john@example.com  | password123    |  30 | male   | 1992-05-15
//   2 | Jane Smith    | jane@example.com  | securepassword |  25 | female | 1997-10-20
//   3 | Alice Johnson | alice@example.com | strongpassword |  35 | female | 1987-03-10
//   4 | Bob Brown     | bob@example.com   | password123    |  40 | male   | 1982-11-25
*/