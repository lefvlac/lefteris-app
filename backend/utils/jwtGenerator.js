const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator({ user_id }) {
  const user = { user_id };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });

  return { accessToken };
}

module.exports = jwtGenerator;
