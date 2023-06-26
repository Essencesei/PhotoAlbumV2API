const UserModel = require("../model/userSchema");

exports.acceptFriendRequest = async (req, res) => {
  try {
    const {
      params: { username, reqUsername },
    } = req;

    const userFriendReqList = await UserModel.find({ username: username });
    const friendRequesterData = await UserModel.find({ username: username });
    const friendRequestedData = await UserModel.find({ username: reqUsername });

    //check if the user current friendReqlist array actually have the requester id
    // here we can validate if there is a pending friend request

    if (!userFriendReqList[0].friendsReq.includes(friendRequestedData[0]._id))
      throw new Error("Not in friends");

    // add the Id of the accepted friend in the users friends array
    await UserModel.findOneAndUpdate(
      { username: username },
      {
        $addToSet: { friends: friendRequestedData[0]._id },
      }
    );
    await UserModel.findOneAndUpdate(
      { username: reqUsername },
      {
        $addToSet: { friends: friendRequesterData[0]._id },
      }
    );

    // Delete the id in the friendsReq
    const update = await UserModel.findOneAndUpdate(
      { username: username },
      { $pull: { friendsReq: friendRequestedData[0]._id } },
      { new: true }
    );

    // throw error
    if (!update) throw new Error("There is something wrong");

    res.status(200).json({
      message: "Friend request accepted",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
