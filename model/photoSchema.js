const mongoose = require("mongoose");
const UserModel = require("./userSchema");

const PhotoSchema = new mongoose.Schema({
  imgPath: {
    type: String,
  },
  image: {
    image: Buffer,
    contentType: String,
  },
  name: {
    type: String,
  },
  captureDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  uploader: {
    type: String,
    required: true,
  },
  uploaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentModel",
    },
  ],

  privacy: {
    type: Boolean,
  },
});

const PhotoModel = new mongoose.model("PhotoModel", PhotoSchema);

module.exports = PhotoModel;
