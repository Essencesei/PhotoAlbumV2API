const NotificationModel = require("../model/notificationSchema");
const UserModel = require("../model/userSchema");

exports.getAllNotificationsByUser = async (req, res) => {
  try {
    const userData = await UserModel.find({ username: req.token.username });
    const notifData = await NotificationModel.find({ to: userData[0]._id });

    res.status(200).json({
      message: "Displaying all user notifications",
      data: notifData,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
