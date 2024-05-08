const expres = require("express");
const router = expres.Router();

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
//router.use(bodyParser.json());

console.log("you reached stat.js");

router.get("/HeartRate",async (req,res)=>{
   res.send().status(200);
    console.log("You are  here");
    try {
        
        const user = await getUserInformationToExport();
        const id = user.id;
        const query = await client.query('SELECT result , datetime FROM heartratehistory where patientid = $1 ORDER BY datetime desc LIMIT 4;',[id]);
        const result = (query).rows;
        res.json(result);
        
    }catch(error){

    }
}
);

module.exports = router;

