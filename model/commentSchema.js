const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  commentatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  photoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PhotoModel",
  },
});

const CommentModel = new mongoose.model("CommentModel", CommentSchema);

module.exports = CommentModel;
