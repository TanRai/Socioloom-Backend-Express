const mysql = require("mysql2");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "killernet",
  database: "socioloom",
});

module.exports = db;
