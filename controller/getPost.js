const PhotoModel = require("../model/photoSchema");
const fs = require("fs");
exports.getPost = async (req, res) => {
  try {
    const {
      params: { photoId },
    } = req;

    console.log(photoId);
    const data = await PhotoModel.findOne({ _id: photoId }).populate({
      path: "uploaderId",
      select: "profilePicPath",
    });

    const modifiedData = {
      _id: data._id,
      name: data.name,
      captureDate: data.captureDate,
      description: data.description,
      uploader: data.uploader,
      uploaderId: data.uploaderId,
      uploaderName: data.uploaderName,
      likes: data.likes,
      thumbnail: {
        contentType: "multipart/form-data.",
        image: fs.existsSync(data.uploaderId.profilePicPath)
          ? new Buffer.from(
              fs.readFileSync(data.uploaderId.profilePicPath),
              "base64"
            )
          : new Buffer.from(fs.readFileSync("uploads\\brokenImg"), "base64"),
      },
      comments: data.comments,
      privacy: data.privacy,
      __v: data.__v,
      image: {
        contentType: "multipart/form-data.",
        image: fs.existsSync(data.imgPath)
          ? new Buffer.from(fs.readFileSync(data.imgPath), "base64")
          : new Buffer.from(fs.readFileSync("uploads\\brokenImg"), "base64"),
      },
    };

    res.status(200).json({
      message: "Post",
      data: modifiedData,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
