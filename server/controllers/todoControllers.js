import pool from "../config/db.js";
import { v1 as uuidv1 } from "uuid";

//Create new Todo
export const newTodo = async (req, res) => {
  const { userId, title, description } = req.body;
  try {
    const uuid = uuidv1();
    if (!userId || !title || !description) {
      return res
        .status(400)
        .send({ success: false, message: "Required fields are missing" });
    }

    const insertTodoQuery =
      "INSERT INTO todos(_id, user_id, title, description) VALUES (?, ?, ?, ?)";
    const insertTodoValues = [uuid, userId, title, description];

    await pool.query(insertTodoQuery, insertTodoValues);

    const [rows] = await pool.query("SELECT * FROM todos WHERE _id = ?", [
      uuid,
    ]);
    const newTodo = rows[0];

    res
      .status(500)
      .send({ success: true, message: "New todo created", todo: newTodo });
  } catch (error) {
    console.error("Error creating new todo");
    res.status(500).send({ success: false, error: error.message });
  }
};
