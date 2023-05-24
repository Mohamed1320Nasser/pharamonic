process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err.stack);
});

const cors = require("cors");
const { appRouter } = require("./src/utils/index.router");
const bodyParser = require("body-parser");
const express = require('express');

//express framework
const app = express()

//  access to api 
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
//convert buffer to json
app.use(bodyParser.json());

// module dotenv to save the improtant data
require("dotenv").config({ path: "./config/.env" });

// all routers 
appRouter(app)

const port = process.env.PORT


// Handle rejection outside express
process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection", err.stack);
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))