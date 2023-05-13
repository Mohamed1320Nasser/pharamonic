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
  app.use("/manger", require("../component/manger/monger.routes"));
  // app.use("/activities", require("./activities/activity.routes"));
  // app.use("/students", require("./student/student.routes"));
  // app.use("/categories", require("./Categories/category.routes"));
  // app.use("/trips", require("./trips/trips.routes"));
  // app.use("/enroll", require("./enroll/enroll.routes"));
  // app.use("/contact", require("./studentMessage/message.routes"));

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
