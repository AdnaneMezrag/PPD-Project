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

route.post("/", async (req, res) => {
  // recieving a request containing user data:{name,email,pswrd,DOB}(id will be generated auto)

  try {
    const { email, password, username, Dateofbirth, age, gender } = req.body;
    //res.json({email : email}); OK STATUS 
    //searching
    const existingUser = await client.query(
      "SELECT * FROM patients WHERE email=$1",
      [email]
    );
    //  res.json({password : username}); OK STATUS
    if (existingUser.rows.length !== 0) {
      console.log(
        "Email Adresse '" +
          email +
          "' Used ... Please Try Again With a Diffrenet Email..."
      );
      return res.json({ userAdded: false }); //for generating a message for the user (front end)
    }

    const birthday = new Date(dob); // this or it will not work...

    const apost = await client.query(
      "INSERT INTO patients (name, email, password, age, gender, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [username, email, password, age, gender, birthday]
    );

    console.log("User added successfully:", username);
    res.json({ userAdded: true });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "ERROR" });
  }
});

route.put("/edit", async (req, res) => {
  try {
    const user = req.body;
    const name = user.name;
    const id = user.id;
    const age = user.age;
    const email = user.email;

    const edit = await client.query(
      "UPDATE patients SET name = $1, email = $2, age = $3 WHERE id = $4",
      [name, email, age, id]
    );
  } catch (error) {
    console.error("editing error..." + error);
  }
});
//   const query = {
//   text: 'UPDATE users SET email = $1 WHERE id = $2',
//   values: [newEmail, userId],
// }

module.exports = route;
