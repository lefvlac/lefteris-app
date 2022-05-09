const express = require("express");
const router = express.Router();
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorization");
const {
  registerController,
  loginController,
  logoutController,
  verifyController,
} = require("../controllers/authController");

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").post(authorize, logoutController);
router.route("/verify").get(authorize, verifyController);

module.exports = router;
