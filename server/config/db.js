import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB_NAME } = process.env;

const pool = mysql
  .createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
  })
  .promise();

export default pool;
