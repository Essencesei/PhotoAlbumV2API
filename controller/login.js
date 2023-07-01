const UserModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const {
      body: { username, password },
    } = req;

    // console.log(username);

    const userData = await UserModel.find({ username: username });

    if (userData.length === 0) throw new Error("User not found");

    const valid = await bcrypt.compare(password, userData[0].password);

    if (!valid) throw new Error("Incorrect Cred");

    const token = await jwt.sign(
      { username: userData[0].username },
      process.env.SECRET_KEY
    );

    res.cookie("token", token, {
      maxAge: 900000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logged In",
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
