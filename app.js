const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const router = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://649d55453b4966593e127c32--silver-bunny-623e4b.netlify.app", credentials: true }));
app.use(cookieParser());

app.use("/test", router);

module.exports = app;
