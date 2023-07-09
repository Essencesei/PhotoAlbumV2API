const NotificationModel = require("../model/notificationSchema");
const UserModel = require("../model/userSchema");

//Friend Request
exports.sendFriendRequest = async (req, res) => {
  try {
    const {
      params: { reqUsername },
    } = req;

    const newUsername =
      reqUsername.split("")[0] === "@" ? reqUsername : "@" + reqUsername;

    const friendRequesterData = await UserModel.find({
      username: req.token.username,
    });
    const friendRequestedData = await UserModel.find({ username: newUsername });

    //check if already friends by checking if there is friendRequestedId in the friends array of friendRequester

    if (friendRequesterData[0].friends.includes(friendRequestedData[0]._id))
      throw new Error("Already Friends");

    const friendReqNotif = await NotificationModel.create({
      description: `${req.token.username} sent you a friend request`,
      to: friendRequestedData[0]._id,
      from: friendRequesterData[0]._id,
      notifType: "Friend Request",
    });

    // console.log("friendReqNotif ", friendReqNotif);

    //  const notificationData = await NotificationModel.find({})

    // add the id of the friendrequester in the friendRequested friendsReq array
    const updated = await UserModel.findOneAndUpdate(
      { username: reqUsername },
      {
        $addToSet: {
          friendsReq: friendRequesterData[0]._id,
          notifications: friendReqNotif._id,
        },
      },
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
