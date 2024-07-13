import express from "express";
import {
  deleteTodo,
  findTodo,
  newTodo,
} from "../controllers/todoControllers.js";

const todoRoutes = express.Router();

todoRoutes.post("/new", newTodo);
todoRoutes.delete("/delete/:todoId", deleteTodo);
todoRoutes.put("/edit/:todoId");
todoRoutes.get("/find/:todoId", findTodo);
todoRoutes.get("/all/:userId");

export default todoRoutes;
