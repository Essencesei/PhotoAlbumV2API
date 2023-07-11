const bcrypt = require("bcrypt");
const UserModel = require("../model/userSchema");
const fs = require("fs");

exports.registerNewUser = async (req, res) => {
  try {
    const {
      body: { username, password, firstName, lastName },
      files: { profilePic, cover },
    } = req;

    const hash = await bcrypt.hash(password, 10);

    const newUsername =
      username.split("")[0] === "@" ? username : "@" + username;

    const existing = await UserModel.find({ username: newUsername });

    if (existing.length > 0) throw new Error("Username Already Exist");

    const doc = {
      username: newUsername,
      password: hash,
      firstName,
      lastName,
      // Save the path itself to db
      profilePicPath: profilePic[0]?.path,
      coverPath: cover[0]?.path,
    };

    const docStatus = await UserModel.create(doc);

    // console.log(docStatus);

    // const removeImage = (filename) => {
    //   filename.forEach((element) => {
    //     fs.unlinkSync(req.files[element][0].path);
    //   });
    // };
    // removeImage(["profilePic", "cover"]);

    res.status(201).json({
      message: "Registered successfuly",
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
