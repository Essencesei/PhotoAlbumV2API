const express = require("express");
const router = express.Router();

const { ping } = require("../controller/ping");
const { registerNewUser } = require("../controller/registerNewUser");
const { post } = require("../controller/post");
const { getAllUserPost } = require("../controller/getAllUserPost");
const { comment } = require("../controller/comment");
const { getAllCommentByPost } = require("../controller/getAllCommentByPost");
const { sendFriendRequest } = require("../controller/sendFriendRequest");
const { acceptFriendRequest } = require("../controller/acceptFriendRequest");
const { getFriendsByUser } = require("../controller/getFriendsByUser");
const { getAllUser } = require("../controller/getAllUser");
const { postLike } = require("../controller/postLike");

const multer = require("multer");
const { login } = require("../controller/login");
const { verifyJWT } = require("../middlewares/verifyJWT");

//Set storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router
  .get("/ping", ping)
  .get("/:username/post", getAllUserPost)
  .get("/:username/:photoId/comment", getAllCommentByPost)
  .get("/:username/friends", getFriendsByUser)
  .get("/users", getAllUser);

router
  .post(
    "/register",
    upload.fields([
      { name: "profilePic", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),

    registerNewUser
  )
  .post("/post", upload.single("image"), verifyJWT, post)
  .post("/:username/:photoId/comment", comment)
  .post("/:username/request/:reqUsername", sendFriendRequest)
  .post("/:username/accept/:reqUsername", acceptFriendRequest)
  .post("/:username/:photoId/like", postLike)
  .post("/login", login);

module.exports = router;
