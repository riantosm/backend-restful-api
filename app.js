require("dotenv").config();

const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
const port = process.env.SERVER_PORT;

app.use("/uploads", express.static("./uploads"));

var allowedOrigins = ['http://localhost:3000', 'http://192.168.1.237:3000'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require("./src/routers/index.js");

app.use(morgan('combined'));

app.use("/api/v1", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))