const UserModel = require("../model/userSchema");
const fs = require("fs");

exports.getUser = async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    console.log("getUser: LINE 10: ",req.token.username)

    const userData = await UserModel.find({
      _id: id ? id : req.token._id,
    }).select("-password");
    userData.forEach((element) => {
      // function for transforming the image to buffer, using fs to determine the
      // file directory
      const bufGen = (field) => {
        return fs.existsSync(element[field])
          ? new Buffer.from(fs.readFileSync(element[field]), "base64")
          : new Buffer.from(
              fs.readFileSync("uploads\\brokenImg.png"),
              "base64"
            );
      };

      // populate the profilepic and cover field in userdata object
      element.profilePic = {
        image: bufGen("profilePicPath"),
        contentType: "multipart/form-data",
      };

      element.cover = {
        image: bufGen("coverPath"),
        contentType: "multipart/form-data",
      };
    });

    res.status(200).json({
      message: "Displaying User",
      data: userData,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
