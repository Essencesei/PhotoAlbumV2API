const UserModel = require("../model/userSchema");
const fs = require("fs");

exports.searchUser = async (req, res) => {
  try {
    const {
      query: { query },
    } = req;

    if (query === "") throw new Error("Please include atleast a keyword");

    const regex = new RegExp(query, "i");

    const userData = await UserModel.find({
      $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
    });

    const data = userData.map((el) => {
      return {
        username: el.username,
        firstName: el.firstName,
        lastName: el.lastName,
        profilePic: fs.existsSync(el.profilePicPath)
          ? new Buffer.from(fs.readFileSync(el.profilePicPath), "base64")
          : new Buffer.from(fs.readFileSync("uploads\\brokenImg"), "base64"),
      };
    });
    res.status(200).json({
      message: "User found",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
