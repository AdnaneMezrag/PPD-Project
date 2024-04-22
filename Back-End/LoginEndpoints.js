const expres = require("express");

const router = expres.Router();
// db

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

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email " + email + "psw" + password);
    let userFound;
    console.log("HERE");
    const table = (await client.query("SELECT * FROM patients;")).rows;

    //OR use normal query for better performance (TODO)
    // const result = await client.query("SELECT * FROM patients WHERE email = $1 AND password = $2", [email, password]);

    const queryResult = table.find(
      (patient) => patient.email === email && patient.password === password
    );

    if (!queryResult) {
      userFound = false;
      //     res.status(404).send  userFound);
      res.json({ userFound }); // this message shall be used for informing the user in case of wrong
      return;
    } else {
      userFound = true;
      //   res.send(userMESSAGE); only one result shall be sent at a time

      res.json({
        name: queryResult.name,
        id: queryResult.id,
        email: queryResult.email,
        password: queryResult.password,
        gender: queryResult.gender,
        birthday: queryResult.date_of_birth,
        userFound: userFound,
      });
    }
  } catch (error) {
    res.send("ERROR");
  }
});

module.exports = router;

// id |     name      |       email       |    password    | age | gender | date_of_birth
// ----+---------------+-------------------+----------------+-----+--------+---------------
//   1 | John Doe      | john@example.com  | password123    |  30 | male   | 1992-05-15
//   2 | Jane Smith    | jane@example.com  | securepassword |  25 | female | 1997-10-20
//   3 | Alice Johnson | alice@example.com | strongpassword |  35 | female | 1987-03-10
//   4 | Bob Brown     | bob@example.com   | password123    |  40 | male   | 1982-11-25
