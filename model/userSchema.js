const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  profilePic: {
    image: Buffer,
    contentType: String,
  },
  cover: {
    image: Buffer,
    contentType: String,
  },
  profilePicPath: {
    type: String,
  },
  coverPath: {
    type: String,
  },
  // profilePic: {
  //   type: String,
  // },
  // cover: {
  //   type: String,
  // },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  ],
  friendsReq: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhotoModel",
    },
  ],
  notifications: {
    type: Array,
    default: [],
  },
  theme: {
    type: Array,
    default: [],
  },
});

const UserModel = new mongoose.model("UserModel", UserSchema);

module.exports = UserModel;
