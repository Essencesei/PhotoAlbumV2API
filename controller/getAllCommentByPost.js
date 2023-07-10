const PhotoModel = require("../model/photoSchema");

exports.getAllCommentByPost = async (req, res) => {
  //Deconstruct req  object
  try {
    const {
      params: { username, photoId },
      query: { sort },
    } = req;

    const photoData = await PhotoModel.find({ _id: photoId }).populate({
      path: "comments",
      options: {
        sort: { date: sort },
      },
    });

    res.status(201).json({
      message: "success",
      data: photoData[0].comments,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
