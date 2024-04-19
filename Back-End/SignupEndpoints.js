const expres = require("express");
const route = expres.Router();

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

route.post("/", async (req, res) => {
  // recieving a request containing user data:{name,email,pswrd,DOB}(id will be generated auto)

  try {
    const { email, password, username, Dateofbirth, age, gender } = req.body;

    //searching
    const existingUser = await client.query(
      "SELECT * FROM patients WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length !== 0) {
      console.log(
        "Email Adresse '" +
          email +
          "' Used ... Please Try Again With a Diffrenet Email..."
      );
      return res.json({ userAdded: false }); //for generating a message for the user (front end)
    }

    const birthday = new Date(Dateofbirth); // this or it will not work...

    const apost = await client.query(
      "INSERT INTO patients(name,email,password,age,gender,date_of_birth) VALUES($1,$2,$3,$4,$5,$6)",
      [username, email, password, age, gender, birthday]
    );

    console.log("User added successfully:", username);
    res.json({ userAdded: true });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// route.put("/edit")  editing user info through this endpoint ,  use this query :
//   const query = {
//   text: 'UPDATE users SET email = $1 WHERE id = $2',
//   values: [newEmail, userId],
// }

module.exports = route;
