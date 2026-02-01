const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "car_showroom",
  password: "789456123",
  port: 5432,
});

module.exports = pool;
