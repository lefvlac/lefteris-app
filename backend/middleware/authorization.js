const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    //CHECK IF NOT TOKEN
    const token = req.headers["x-access-token"];
    console.log(token);
    if (!token) {
      return res.status(403).json({ msg: "Authorization Denied" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      req.token = token;
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
