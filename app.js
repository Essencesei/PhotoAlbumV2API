const express = require("express");
const UserModel = require("./model/userSchema");
const cors = require("cors");
const app = express();

const PhotoModel = require("./model/photoSchema");
const CommentModel = require("./model/commentSchema");

const router = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/test", router);

module.exports = app;
