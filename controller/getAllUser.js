const UserModel = require("../model/userSchema");

exports.getAllUser = async (req, res) => {
  try {
    const userData = await UserModel.find({}).select("-password");

    res.status(200).json({
      message: "Displaying all User",
      lenght: userData[0].lenght,
      data: [...userData],
    });
  } catch (err) {}
};
