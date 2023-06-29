const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const router = require("./routes/routes");

const compression = require("compression");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/test", router);

module.exports = app;
