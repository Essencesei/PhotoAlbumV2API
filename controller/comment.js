const UserModel = require("../model/userSchema");
const PhotoModel = require("../model/photoSchema");
const CommentModel = require("../model/commentSchema");
const NotificationModel = require("../model/notificationSchema");

// User comments and pushing of commentId to PhotoModel comments[]

exports.comment = async (req, res, next) => {
  //Deconstruct req and params object
  // console.log(req.params);
  try {
    const {
      body: { comment },
      params: { photoId },
    } = req;

    // Store fetched data in variables
    const userData = await UserModel.find({ username: req.token.username });
    const photoData = await PhotoModel.find({ _id: photoId });

    //create doc structure
    const doc = {
      username: userData[0].username,
      comment,
      commentatorId: userData[0]._id,
      photoId: photoData[0]._id,
    };

    // create a collection with doc structure
    await CommentModel.create(doc);

    //store fetched data into variable
    const commentData = await CommentModel.find({
      commentatorId: userData[0]._id,
    });

    // push the id of latestcommentdata into photodata comments
    photoData[0].comments.push(commentData[commentData.length - 1]._id);

    //save changes of photo data
    await photoData[0].save();

    //add notification

    const commentNotif = await NotificationModel.create({
      description: `${req.token.username} commented on your post.`,
      to: photoData[0].uploaderId,
      from: userData[0]._id,
      notifType: "Comment",
    });

    await UserModel.findOneAndUpdate(
      { _id: photoData[0].uploaderId },
      { $push: { notifications: commentNotif._id } },
      { new: true }
    );

    res.status(201).json({
      message: "success",
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
