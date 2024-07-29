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
        .json({ success: false, message: "Required fields are missing" });
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
      .status(200)
      .json({ success: true, message: "New todo created", todo: newTodo });
  } catch (error) {
    console.error("Error creating new todo");
    res.status(500).json({ success: false, error: error.message });
  }
};

//Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    if (!todoId) {
      return res
        .status(400)
        .json({ success: false, message: "Todo ID is required" });
    }

    // find and delete todo from the database
    const deleteTodoQuery = "DELETE FROM todos WHERE _id = ?";
    const [result] = await pool.query(deleteTodoQuery, [todoId]);

    // Check if a todo was deleted
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting the todo", error);
    res.status(500).json({ success: false, error: error.message });
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
        .json({ success: false, message: "Todo ID is required" });
    }

    const [rows] = await pool.query("SELECT * FROM todos WHERE _id = ?", [
      todoId,
    ]);

    // check if found
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    const todo = rows[0];
    res.status(200).json({ success: true, todo });
  } catch (error) {
    console.error("Error finding the todo", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// find todos for user by
export const findTodosForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // todos for the user
    const [rows] = await pool.query(
      "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at ASC",
      [userId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No todos found for the user" });
    }

    const todosForUser = rows;
    res.status(200).json({ success: true, todosForUser });
  } catch (error) {
    console.error("Error finding todos for the user", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// update todo
export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, description, status } = req.body;

    if (!todoId) {
      return res
        .status(400)
        .json({ success: false, message: "Todo ID is required" });
    }

    if (!title && !description && !status) {
      return res.status(400).json({
        success: false,
        message: "Title, description or status is missing",
      });
    }

    // Build UPDATE query based on provided fields
    let updateTodoQuery = "UPDATE todos SET ";
    const updateValues = [];

    if (title) {
      updateTodoQuery += "title = ?, ";
      updateValues.push(title);
    }
    if (description) {
      updateTodoQuery += "description = ?, ";
      updateValues.push(description);
    }
    if (status) {
      updateTodoQuery += "status = ?, ";
      updateValues.push(status);
    }

    // Remove the last comma and space
    updateTodoQuery = updateTodoQuery.slice(0, -2);

    // Add WHERE clause for specific todoId
    updateTodoQuery += " WHERE _id = ?";
    updateValues.push(todoId);

    // Execute the update query
    const [result] = await pool.query(updateTodoQuery, updateValues);

    // Check if a todo was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or no fields provided for update",
      });
    }

    const [rows] = await pool.query("SELECT * FROM todos WHERE _id = ?", [
      todoId,
    ]);

    const updatedTodo = rows[0];

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.error("Error updating the todo", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
