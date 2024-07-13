import express from "express";
import { deleteTodo, newTodo } from "../controllers/todoControllers.js";

const todoRoutes = express.Router();

todoRoutes.post("/new", newTodo);
todoRoutes.delete("/delete/:todoId", deleteTodo);
todoRoutes.put("/edit/:todoId");
todoRoutes.get("/find/:todoId");
todoRoutes.get("/all");

export default todoRoutes;
