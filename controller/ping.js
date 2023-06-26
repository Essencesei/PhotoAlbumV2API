exports.ping = (req, res) => {
  res.status(201).json({
    message: "Ping",
  });
};
