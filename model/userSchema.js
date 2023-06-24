const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  cover: {
    type: String,
  },
  friends: {
    type: Array,
    default: [],
  },
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
