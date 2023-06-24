const express = require("express");
const UserModel = require("./model/userSchema");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const PhotoModel = require("./model/photoSchema");
const CommentModel = require("./model/commentSchema");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User registration
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

// Posting of user and pushing of the postId to the UserModel's posts[]
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

// Get all post by user
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
      data: data[0].posts,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// User comments and pushing of commentId to PhotoModel comments[]

app.post("/test/:username/:photoId/comment", async (req, res) => {
  //Deconstruct req and params object
  try {
    const {
      body: { comment },
      params: { username, photoId },
    } = req;

    // Store fetched data in variables
    const userData = await UserModel.find({ username: username });
    const photoData = await PhotoModel.find({ _id: photoId });

    //create doc structure
    const doc = {
      username: userData[0].username,
      comment,
      commentatorId: userData[0]._id,
      photoId: photoData[0]._id,
    };

    // create a collection with doc structure
    await CommentModel.create(doc);

    //store fetched data into variable
    const commentData = await CommentModel.find({
      commentatorId: userData[0]._id,
    });

    // push the id of latestcommentdata into photodata comments
    photoData[0].comments.push(commentData[commentData.length - 1]._id);

    //save changes of photo data
    await photoData[0].save();

    res.status(201).json({
      message: "success",
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//get all comments on specific post by id

app.get("/test/:username/:photoId/comment", async (req, res) => {
  //Deconstruct req  object
  try {
    const {
      params: { username, photoId },
    } = req;

    const photoData = await PhotoModel.find({ _id: photoId }).populate(
      "comments"
    );

    res.status(201).json({
      message: "success",
      data: photoData,
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
