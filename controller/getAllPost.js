const PhotoModel = require("../model/photoSchema");
const UserModel = require("../model/userSchema");
const fs = require("fs");

// Get all post by user
exports.getAllPost = async (req, res) => {
  try {
    // Deconstruct req
    const {
      query: { page, limit, sort },
    } = req;

    const data = await PhotoModel.find()
      .limit(limit)
      .skip((page - 1) * limit)

      .sort({ captureDate: sort })
      .populate({ path: "uploaderId", select: "profilePicPath" });

    console.log(data);

    const newData = data.map((el) => {
      const data = {
        _id: el._id,
        name: el.name,
        captureDate: el.captureDate,
        description: el.description,
        uploader: el.uploader,
        uploaderId: el.uploaderId,

        uploaderName: el.uploaderName,
        likes: el.likes,
        thumbnail: {
          contentType: "multipart/form-data",
          image: fs.existsSync(el.uploaderId.profilePicPath)
            ? new Buffer.from(
                fs.readFileSync(el.uploaderId.profilePicPath),
                "base64"
              )
            : new Buffer.from(fs.readFileSync("uploads\\brokenImg"), "base64"),
        },

        comments: el.comments,
        privacy: el.privacy,
        __v: el.__v,
        image: {
          contentType: "multipart/form-data",
          image: fs.existsSync(el.imgPath)
            ? new Buffer.from(fs.readFileSync(el.imgPath), "base64")
            : new Buffer.from(fs.readFileSync("uploads\\brokenImg"), "base64"),
        },
      };

      return data;
    });

    res.status(200).json({
      message: "success",
      length: data.length,
      page: page,
      data: newData,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
