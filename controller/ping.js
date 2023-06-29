const jwt = require("jsonwebtoken");

exports.ping = async (req, res) => {
  res.status(201).json({
    message: "Ping",
  });
};
