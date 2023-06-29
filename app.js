const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const router = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://localhost:3001", credentials: true }));
app.use(cookieParser());

app.use("/test", router);

module.exports = app;
