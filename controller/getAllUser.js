const UserModel = require("../model/userSchema");
const zlib = require("zlib");
const fs = require("fs");

exports.getAllUser = async (req, res) => {
  try {
    const userData = await UserModel.find({}).select(["-password"]);

    // iterate over userData

    userData.forEach((element) => {
      // function for transforming the image to buffer, using fs to determine the
      // file directory
      const bufGen = (field) => {
        console.log(field);
        return new Buffer.from(fs.readFileSync(element[field]), "base64");
      };

      const buff = new Buffer.from(
        fs.readFileSync(element.coverPath),
        "base64"
      );

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
  } catch (err) {}
};
