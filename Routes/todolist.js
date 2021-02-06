const express = require("express");
const router = express.Router();

//@routes  GET api/todolist
// desc get all todolist
// access Private
router.get("/", (req, res) => {
  res.send("Get all TodoList");
});
//@routes  POST api/todolist
// desc add new TodoList
// access Private
router.post("/", (req, res) => {
  res.send("Add new TodoList");
});
//@routes  PUT api/todolist/:id
// desc update todoList
// access Private
router.put("/:id", (req, res) => {
  res.send("update todoList");
});
//@routes  Delete api/todolist/:id
// desc Delete todoList
// access Private
router.delete("/:id", (req, res) => {
  res.send("Delete todoList");
});

module.exports = router;
