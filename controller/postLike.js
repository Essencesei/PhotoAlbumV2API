const PhotoModel = require("../model/photoSchema");
const UserModel = require("../model/userSchema");

exports.postLike = async (req, res) => {
  try {
    const {
      params: { username, photoId },
    } = req;
    const userData = await UserModel.find({ username: username });
    const photoDataRaw = await PhotoModel.find({ _id: photoId });

    // if (photoDataRaw.likes.includes(userData[0]._id)) {
    //   console.log("damn");
    // }

    let photoData;

    photoDataRaw[0].likes.includes(userData[0]._id)
      ? (photoData = await PhotoModel.findOneAndUpdate(
          { _id: photoId },
          { $pull: { likes: userData[0]._id } }
        ))
      : (photoData = await PhotoModel.findOneAndUpdate(
          { _id: photoId },
          { $addToSet: { likes: userData[0]._id } }
        ));

    await photoData.save();

    res.status(200).json({
      message: "Like Updated",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
