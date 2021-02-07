const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied " });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
