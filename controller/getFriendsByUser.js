const UserModel = require("../model/userSchema");
const fs = require("fs");

exports.getFriendsByUser = async (req, res) => {
  try {
    // exclude password in data return
    const friendList = await UserModel.find({
      username: req.token.username,
    }).populate({
      path: "friends",
      select: "-password",
    });

    const modifiedFriendList = friendList[0].friends.map((element) => {
      console.log(element);
      const data = {
        _id: element._id,
        username: element.username,
        firstName: element.firstName,
        lastNamee: element.lastName,
        image: {
          contentType: "multipart/form-data",
          image: fs.existsSync(element.profilePicPath)
            ? new Buffer.from(fs.readFileSync(element.profilePicPath), "base64")
            : new Buffer.from(
                fs.readFileSync("uploads\\brokenImg.png"),
                "base64"
              ),
        },
      };

      return data;
    });

    res.status(200).json({
      message: `${req.token.username} friends List`,
      length: friendList[0].friends.length,
      data: modifiedFriendList,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
