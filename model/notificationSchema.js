const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  notifType: {
    type: String,
    require: true,
  },
});

const NotificationModel = new mongoose.model(
  "NotificationModel",
  NotificationSchema
);

module.exports = NotificationModel;
