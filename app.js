process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err.stack);
});
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require('express')
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// module dotenv to save the improtant data
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 4000;

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection", err.stack);
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))