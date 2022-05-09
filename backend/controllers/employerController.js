const { parse } = require("dotenv");
const pool = require("../db/db");

//GET ALL EMPLOYERS
exports.getEmployers = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM employer ORDER BY employer_id"
    );
    return res.status(200).json({
      success: true,
      results: results.rows.length,
      data: {
        employers: results.rows,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
//GET EMPLOYER BY ID
exports.getEmployerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const results = await pool.query(
      "SELECT * FROM employer WHERE employer_id = $1",
      [id]
    );
    return res.status(200).json({
      success: true,
      data: {
        employer: results.rows[0],
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Employer not Found",
    });
  }
};
//CREATE EMPLOYER
exports.addEmployer = async (req, res, next) => {
  try {
    const { first_name, last_name, date_of_birth } = req.body;

    const results = await pool.query(
      "INSERT INTO employer (first_name,last_name,date_of_birth) VALUES ($1,$2,$3) RETURNING *",
      [first_name, last_name, date_of_birth]
    );
    return res.status(201).json({
      success: true,
      data: {
        employer: results.rows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
//UPDATE EMPLOYER
exports.updateEmployer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, date_of_birth } = req.body;
    const results = await pool.query(
      "UPDATE employer SET first_name=$1, last_name=$2, date_of_birth=$3 WHERE employer_id=$4 RETURNING *",
      [first_name, last_name, date_of_birth, id]
    );
    return res.status(200).json({
      success: true,
      data: {
        employer: results.rows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
//DELETE EMPLOYER
exports.deleteEmployer = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM employer WHERE employer_id = $1", [id]);
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
