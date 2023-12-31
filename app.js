const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv").config({ path: "./.env" });

const router = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "http://localhost:4200",
      "http://localhost:3000",
    ],

    credentials: true,
  })
);

app.use(cookieParser());

app.use("/test", router);

module.exports = app;
