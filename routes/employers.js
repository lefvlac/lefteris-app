const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorization");

const {
  getEmployers,
  getEmployerById,
  addEmployer,
  updateEmployer,
  deleteEmployer,
} = require("../controllers/employerController");

router.route("/").get(authorize, getEmployers).post(addEmployer);
router
  .route("/:id")
  .get(authorize, getEmployerById)
  .put(authorize, updateEmployer)
  .delete(authorize, deleteEmployer);

module.exports = router;
