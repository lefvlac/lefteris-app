const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "potrikas9",
  database: "employer_database",
  host: "localhost",
  port: 5432,
});
module.exports = pool;
