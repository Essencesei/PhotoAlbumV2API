const UserModel = require("../model/userSchema");
const fs = require("fs");

// Get all post by user
exports.getAllUserPost = async (req, res) => {
  try {
    // Deconstruct req
    const {
      query: { page, limit },
    } = req;

    // Store to variable
    const data = await UserModel.find({
      username: req.token.username,
    }).populate({
      path: "posts",
      limit: limit,
      skip: (page - 1) * limit,
      sort: { date: 1 },
    });

    data[0].posts.forEach((element) => {
      // console.log(fs.existsSync(element.imgPath));
      element.image = {
        contentType: "multipart/form-data",
        image: fs.existsSync(element.imgPath)
          ? new Buffer.from(fs.readFileSync(element.imgPath), "base64")
          : new Buffer.from(
              fs.readFileSync("uploads\\brokenImg.png"),
              "base64"
            ),
      };
    });

    res.status(200).json({
      message: "success",
      length: data[0].posts.length,
      page: page,
      data: data[0].posts,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
