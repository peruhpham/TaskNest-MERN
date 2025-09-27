const express = require("express");
const { getTodos, createTodo, updateTodo, deleteTodo, getStats } = require("../controllers/todo.controller");
const router = express.Router();

const todoController = require("../controllers/todo.controller");
// Các route CRUD

router.get("/", getTodos);
//router.get("/stats", getStats);  // Thêm route thống kê
router.get("/stats", todoController.getStats);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
