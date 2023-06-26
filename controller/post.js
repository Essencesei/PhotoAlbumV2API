const UserModel = require("../model/userSchema");
const PhotoModel = require("../model/photoSchema");
const fs = require("fs");

// Posting of user and pushing of the postId to the UserModel's posts[]
exports.post = async (req, res) => {
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
};
