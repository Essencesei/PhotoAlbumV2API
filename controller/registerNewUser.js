const bcrypt = require("bcrypt");
const UserModel = require("../model/userSchema");
const fs = require("fs");

exports.registerNewUser = async (req, res) => {
  try {
    const {
      body: { username, password, firstName, lastName },
      files: { profilePic, cover },
    } = req;

    // const imgProfilePic = fs.readFileSync(req.files.profilePic[0].path);
    // const imgProfileCover = fs.readFileSync(req.files.cover[0].path);
    // const encodeImgProfilePic = imgProfilePic.toString("base64");
    // const encodeImgCover = imgProfileCover.toString("base64");

    // const encodeImage = (fileName) => {
    //   return fs.readFileSync(req.files[fileName][0].path).toString("base64");
    // };

    // const doc = {
    //   username,
    //   password,
    //   firstName,
    //   lastName,
    //   profilePic: {
    //     contentType: req.files.profilePic[0].mimetype,
    //     image: zlib.deflateSync(
    //       new Buffer.from(encodeImage("profilePic"), "base64")
    //     ),
    //   },
    //   cover: {
    //     contentType: req.files.cover[0].mimetype,
    //     image: new Buffer.from(encodeImage("cover"), "base64"),
    //   },
    // };

    // console.log("normal: ", new Buffer.from(imgProfilePic, "base64"));
    // console.log(
    //   "defalted: ",
    //   zlib.deflateSync(new Buffer.from(imgProfilePic, "base64"))
    // );
    // console.log(
    //   "inflated: ",
    //   zlib.inflateSync(
    //     zlib.deflateSync(new Buffer.from(imgProfilePic, "base64"))
    //   )
    // );

    const doc = {
      username,
      password,
      firstName,
      lastName,
      // Save the path itself to db
      profilePicPath: profilePic[0].path,
      coverPath: cover[0].path,
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
    const removeImage = (filename) => {
      filename.forEach((element) => {
        fs.unlinkSync(req.files[element][0].path);
      });
    };

    removeImage(["profilePic", "cover"]);

    res.status(400).json({
      message: err.message,
    });
  }
};