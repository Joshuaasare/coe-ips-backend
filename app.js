const createError = require("http-errors");
const express = require("express");

require("dotenv").config();

const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dbParams = require("./globals");

const mysql = require("mysql");
const connection = require("express-myconnection");
const indexRouter = require("./routes/index");
const AuthRoutes = require("./routes/auth-routes");
// const DataSyncRoutes = require('./routes/data-sync-routes');
// const TransactionRoutes = require('./routes/transaction-routes');
// const AdminRoutes = require('./routes/admin-routes');

const app = express();
const cors = require("cors");
// view engine setup

app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
app.use(connection(mysql, db, "request"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", AuthRoutes);
// app.use('/', DataSyncRoutes);
// app.use('/', TransactionRoutes);
// app.use('/', AdminRoutes);

// catch all different 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
