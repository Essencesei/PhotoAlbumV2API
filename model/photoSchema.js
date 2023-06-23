const mongoose = require("mongoose");
const UserModel = require("./userSchema");

const PhotoSchema = new mongoose.Schema({
  imgLink: {
    type: String,
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
  likes: {
    type: Number,
  },
  comments: {
    type: String,
  },
  privacy: {
    type: Boolean,
  },
});

const PhotoModel = new mongoose.model("PhotoModel", PhotoSchema);

module.exports = PhotoModel;
