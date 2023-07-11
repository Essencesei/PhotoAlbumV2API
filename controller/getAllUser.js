const UserModel = require("../model/userSchema");
const fs = require("fs");

exports.getAllUser = async (req, res) => {
  try {
    const userData = await UserModel.find({}).select(["-password"]);

    // iterate over userData

    userData.forEach((element) => {
      // function for transforming the image to buffer, using fs to determine the
      // file directory
      const bufGen = (field) => {
        return fs.existsSync(element[field])
          ? new Buffer.from(fs.readFileSync(element[field]), "base64")
          : new Buffer.from(fs.readFileSync("uploads\\brokenImg"), "base64");
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
      message: "Displaying all User",
      lenght: userData[0].lenght,
      data: [...userData],
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
