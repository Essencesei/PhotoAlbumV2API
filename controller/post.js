const UserModel = require("../model/userSchema");
const PhotoModel = require("../model/photoSchema");
const fs = require("fs");

// Posting of user and pushing of the postId to the UserModel's posts[]
exports.post = async (req, res) => {
  try {
    // const removeImage = (filename) => {
    //   filename.forEach((element) => {
    //     fs.unlinkSync(req.file.path);
    //   });
    // };

    // Deconstruct req
    const {
      body: { name, captureDate, description, likes, privacy },
      file: { path },
    } = req;

    // fetch userModel data and place in a variable
    const userData = await UserModel.find({ username: req.token.username });

    // Create structure
    const doc = {
      imgPath: path,
      name,
      captureDate,
      description,
      uploader: userData[0].username,
      uploaderId: userData[0]._id,
      likes,
      privacy,
    };

    // Create photomodel with the doc
    await PhotoModel.create(doc);

    // // find the photodata with specific id
    const photoData = await PhotoModel.find({ uploaderId: userData[0]._id });

    if (photoData.length === 0) throw new Error("File not Found");

    // // push the photodata id into userdata posts array
    userData[0].posts.push(photoData[photoData.length - 1]._id);

    // //save changes
    await userData[0].save();

    res.status(201).json({
      message: "Photo Uploaded",
      data: doc,
    });
  } catch (err) {
    fs.unlinkSync(req.file.path);
    res.status(400).json({
      message: err.message,
    });
  }
};
