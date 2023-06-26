const UserModel = require("../model/userSchema");

//Friend Request
exports.sendFriendRequest = async (req, res) => {
  try {
    const {
      params: { username, reqUsername },
    } = req;

    const friendRequesterData = await UserModel.find({ username: username });
    const friendRequestedData = await UserModel.find({ username: reqUsername });

    //check if already friends by checking if there is friendRequestedId in the friends array of friendRequester

    if (friendRequesterData[0].friends.includes(friendRequestedData[0]._id))
      throw new Error("Already Friends");

    // add the id of the friendrequester in the friendRequested friendsReq array
    const updated = await UserModel.findOneAndUpdate(
      { username: reqUsername },
      { $addToSet: { friendsReq: friendRequesterData[0]._id } },
      { new: true }
    );

    if (!updated) throw new Error(`${reqUsername} not found`);

    res.status(200).json({
      message: "Friend request sent",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
