import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v1 as uuidv1 } from "uuid";

//Register user
export const registerUser = async (req, res) => {
  try {
    const saltRounds = 10;

    const uuid = uuidv1();

    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res.status(400).json({
        success: false,
        message: "Name, email or password are missing!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert the user into database
    const insertUserQuery =
      "INSERT INTO users (_id, name, email, password) VALUES (?, ?, ?, ?)";
    const insertUserValues = [uuid, name, email, hashedPassword];

    await pool.query(insertUserQuery, insertUserValues);

    res
      .status(200)
      .json({ success: true, message: "New user created successfully!" });
  } catch (error) {
    console.error("Error creating new user");
    res.status(500).json({ success: false, error: error.message });
  }
};

//Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = rows[0];
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Email or password is wrong" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched || !user) {
      return res
        .status(400)
        .send({ success: false, message: "Email or password is wrong" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECTER_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error("Error login user");
    res.status(500).json({ success: false, error: error.message });
  }
};

// Logged user
export const loggedUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [rows] = await pool.query("SELECT * FROM users WHERE _id = ?", [
      userId,
    ]);
    const user = rows[0];

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error logged user:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
