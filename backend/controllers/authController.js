const { parse } = require("dotenv");
const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtGenerator = require("../utils/jwtGenerator");
exports.registerController = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    //SEE IF USER EXISTS
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).send("User already exists");
    }
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //CHECK IF USER EXISTS
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect");
    }
    //VALIDATE PASSWORD
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Password or email is incorrect!");
    }
    //GIVE THE TOKEN
    const token = jwtGenerator(user.rows[0].user_id);
    res.json(token);
    // res.header("auth-token", accessToken).json({ accessToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.logoutController = async (req, res) => {
  //Destroy Token
  // try {
  //   console.log(req.user);
  //   req.user.token = req.user.token.filter((token) => {
  //     return token.token !== req.token;
  //     res.status(200).json("Logout!");
  //   });
  // } catch (err) {
  //   res.status(500).json("Logout Failed!");
  // }
};

exports.verifyController = async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
