const express = require("express");
const router = express.Router();

const { ping } = require("../controller/ping");
const { registerNewUser } = require("../controller/registerNewUser");
const { post, deletePost } = require("../controller/post");
const { getAllUserPost } = require("../controller/getAllUserPost");
const { comment } = require("../controller/comment");
const { getAllCommentByPost } = require("../controller/getAllCommentByPost");
const { sendFriendRequest } = require("../controller/sendFriendRequest");
const { acceptFriendRequest } = require("../controller/acceptFriendRequest");
const { getFriendsByUser } = require("../controller/getFriendsByUser");
const { getAllUser } = require("../controller/getAllUser");
const { postLike } = require("../controller/postLike");
const { login } = require("../controller/login");
const { verifyJWT } = require("../middlewares/verifyJWT");
const {
  getAllNotificationsByUser,
} = require("../controller/getAllNotificationsByUser");
const { getUser } = require("../controller/getUser");

const multer = require("multer");

// Set storage

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
  .get("/post", verifyJWT, getAllUserPost)
  .get("/comment/:photoId", verifyJWT, getAllCommentByPost)
  .get("/friends", verifyJWT, getFriendsByUser)
  .get("/users", verifyJWT, getAllUser)
  .get("/user", verifyJWT, getUser)
  .get("/notifications", verifyJWT, getAllNotificationsByUser);

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
  .post("/comment/:photoId", verifyJWT, comment)
  .post("/request/:reqUsername", verifyJWT, sendFriendRequest)
  .post("/accept/:reqUsername", verifyJWT, acceptFriendRequest)
  .post("/like/:photoId", verifyJWT, postLike)
  .post("/login", login);

router.delete("/post/:photoId", verifyJWT, deletePost);
module.exports = router;
