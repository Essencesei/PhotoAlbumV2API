const jwt = require("jsonwebtoken");
exports.verifyJWT = async (req, res, next) => {
  try {
    const jwtRes = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    if (!jwtRes) throw new Error();
    req.token = jwtRes;

    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
