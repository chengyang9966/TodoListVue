const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../Model/User");
const auth = require("../middleware/auth");
const TodoList = require("../Model/TodoList");

//@routes  GET api/todolist
// desc get all todolist
// access Private
router.get("/", auth, async (req, res) => {
  try {
    const todoList = await TodoList.find({ user: req.user.id });

    res.json(todoList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error ");
  }
});
//@routes  POST api/todolist
// desc add new TodoList
// access Private
router.post(
  "/",
  [auth, [check("title").notEmpty().withMessage("Name is required ")]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, completed, editing, DueTime } = req.body;

    try {
      const newTodo = new TodoList({
        title,
        description,
        completed,
        editing,
        DueTime,
        user: req.user.id,
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//@routes  PUT api/todolist/:id
// desc update todoList
// access Private
router.put("/:id", auth, async (req, res) => {
  const { title, description, completed, editing, DueTime } = req.body;

  //Build contact object
  const todoField = {};
  if (title) todoField.title = title;
  if (description) todoField.description = description;
  if (completed) todoField.completed = completed;
  if (editing) todoField.editing = editing;
  if (DueTime) todoField.DueTime = DueTime;

  try {
    let todo = await TodoList.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ msg: "Item not found" });
    }
    //Make sure user owen the todoList
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    Todo = await TodoList.findByIdAndUpdate(
      req.params.id,
      {
        $set: todoField,
      },
      { new: true }
    );

    res.json(Todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@routes  Delete api/todolist/:id
// desc Delete todoList
// access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let Todo = await TodoList.findById(req.params.id);
    if (!Todo) {
      return res.status(400).json({ msg: "Item not found" });
    }
    //Make sure user owen the contact
    if (Todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await TodoList.findByIdAndRemove(req.params.id);

    res.json({ msg: "Item Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
