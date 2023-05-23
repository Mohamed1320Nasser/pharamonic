const { dbConnection } = require("../dataBase/dbConnection");
const AppError = require("./AppError");
const globalMiddelwearErr = require("./globalMiddelwearErr");


exports.appRouter = (app) => {

// to determine is development mode or production mode
let morgan = require("morgan");
if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}else{
    app.use(morgan("combined"));
}

  //setup API routes
  app.use("/mangers", require("../component/maanger/monger.routes"));
  app.use("/medications", require("../component/medication/medication.routes"));
  app.use("/doctors", require("../component/doctor/doctor.routes"));
  app.use("/patients", require("../component/patient/patient.routes"));
  

  // end point to tell us wrong path
  app.all("*", (req, res, next) => {
  return  next(
      new AppError(
        `cannot  get this route ${req.originalUrl} in her `,
        404
      )
    );
  });
  //global Error handling middleware
app.use(globalMiddelwearErr);
//connect to database
dbConnection();
};
