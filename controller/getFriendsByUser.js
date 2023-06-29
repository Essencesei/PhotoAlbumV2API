const UserModel = require("../model/userSchema");

exports.getFriendsByUser = async (req, res) => {
  try {
    // exclude password in data return
    const friendList = await UserModel.find({
      username: req.token.username,
    }).populate({
      path: "friends",
      select: "-password",
    });

    res.status(200).json({
      message: `${req.token.username} friends List`,
      length: friendList[0].friends.length,
      data: [...friendList[0].friends],
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
