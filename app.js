const express = require("express");
const UserModel = require("./model/userSchema");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const PhotoModel = require("./model/photoSchema");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/test/register", async (req, res) => {
  try {
    const { username, password, firstName, lastName, profilePic, cover } =
      req.body;

    const doc = {
      username,
      password,
      firstName,
      lastName,
      profilePic,
      cover,
    };

    bcrypt.hash(password, 10, (err, hash) => {
      doc.password = hash;
    });

    await UserModel.create(doc);

    res.status(201).json({
      message: "Account created successfuly",
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.post("/test/:username/post", async (req, res) => {
  try {
    // Deconstruct req
    const {
      body: {
        imgLink,
        name,
        captureDate,
        description,
        likes,
        comments,
        privacy,
      },
      params: { username },
    } = req;

    // fetch userModel data and place in a variable
    const userData = await UserModel.find({ username: username });

    // Create structure
    const doc = {
      imgLink,
      name,
      captureDate,
      description,
      uploader: username,
      uploaderId: userData[0]._id,
      likes,
      comments,
      privacy,
    };

    // Create photomodel with the doc
    await PhotoModel.create(doc);

    // find the photodata with specific id
    const photoData = await PhotoModel.find({ uploaderId: userData[0]._id });

    // push the photodata id into userdata posts array
    userData[0].posts.push(photoData[photoData.length - 1]._id);

    //save changes
    await userData[0].save();

    res.status(201).json({
      message: "Photo Uploaded",
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.get("/test/:username/post", async (req, res) => {
  try {
    // Deconstruct req
    const {
      params: { username },
    } = req;

    // Store to variable
    const data = await UserModel.find({ username: username }).populate("posts");

    //
    res.status(200).json({
      message: "success",
      length: data[0].posts.length,
      data: [data[0].posts],
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.get("/test/ping", (req, res) => {
  res.status(201).json({
    message: "Ping",
  });
});

module.exports = app;
