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

//Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    if (!todoId) {
      return res
        .status(400)
        .send({ success: false, message: "Todo ID is required" });
    }

    // find and delete todo from the database
    const deleteTodoQuery = "DELETE FROM todos WHERE _id = ?";
    const [result] = await pool.query(deleteTodoQuery, [todoId]);

    // Check if a todo was deleted
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Todo not found" });
    }

    res
      .status(200)
      .send({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting the todo", error);
    res.status(500).send({ success: false, error: error.message });
  }
};

// find todo
export const findTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    // Validate todoId presence
    if (!todoId) {
      return res
        .status(400)
        .send({ success: false, message: "Todo ID is required" });
    }

    const [rows] = await pool.query("SELECT * FROM todos WHERE _id = ?", [
      todoId,
    ]);

    // check if found
    if (rows.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Todo not found" });
    }

    const todo = rows[0];
    res.status(200).send({ success: true, todo });
  } catch (error) {
    console.error("Error finding the todo", error);
    res.status(500).send({ success: false, error: error.message });
  }
};
