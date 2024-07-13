import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const { MYSQL_DB_NAME } = process.env;

const usersTable = `
CREATE TABLE IF NOT EXISTS users (
  _id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const todosTable = `
CREATE TABLE IF NOT EXISTS todos (
  _id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(_id) ON DELETE CASCADE
)
`;

export const createTables = async () => {
  try {
    //select the database
    await pool.query(`USE ${MYSQL_DB_NAME}`);

    //create users table
    await pool.query(usersTable);
    console.log(`User table checked/created`);
    //create todos table
    await pool.query(todosTable);
    console.log(`Todo table checked/created`);
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
